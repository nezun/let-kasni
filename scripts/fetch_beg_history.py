#!/usr/bin/env python3
"""Fetch and summarize BEG historical flights from Aviation Edge.

This script is intended to run in GitHub Actions with AVIATION_EDGE_API_KEY
provided through repository secrets.
"""

from __future__ import annotations

import hashlib
import json
import os
import sys
import time
from datetime import date, datetime, timedelta
from pathlib import Path
from typing import Any

import pandas as pd
import requests
from dotenv import load_dotenv


API_ENDPOINT = "https://aviation-edge.com/v2/public/flightsHistory"
AIRPORT_CODE = "BEG"
MONTHS = [
    ("2026-01", date(2026, 1, 1), date(2026, 1, 31)),
    ("2026-02", date(2026, 2, 1), date(2026, 2, 28)),
    ("2026-03", date(2026, 3, 1), date(2026, 3, 31)),
]
DIRECTIONS = ("departure", "arrival")
MONTHLY_SUSPICIOUSLY_SMALL_ROWS = 50
REQUEST_TIMEOUT_SECONDS = 45
REQUEST_PAUSE_SECONDS = 0.25

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
PROCESSED_DIR = ROOT / "data" / "processed"
REPORTS_DIR = ROOT / "reports"


def date_range(start: date, end: date) -> list[date]:
    days = []
    current = start
    while current <= end:
        days.append(current)
        current += timedelta(days=1)
    return days


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def ensure_dirs() -> None:
    for path in (RAW_DIR, PROCESSED_DIR, REPORTS_DIR):
        path.mkdir(parents=True, exist_ok=True)


def safe_json_dump(path: Path, payload: Any) -> None:
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2, sort_keys=True)


def extract_records(payload: Any) -> list[dict[str, Any]]:
    if isinstance(payload, list):
        return [item for item in payload if isinstance(item, dict)]
    if isinstance(payload, dict):
        for key in ("data", "flights", "results", "response"):
            value = payload.get(key)
            if isinstance(value, list):
                return [item for item in value if isinstance(item, dict)]
    return []


def redact_secret(value: Any, secret: str) -> Any:
    if isinstance(value, str):
        return value.replace(secret, "[REDACTED]")
    if isinstance(value, list):
        return [redact_secret(item, secret) for item in value]
    if isinstance(value, dict):
        return {key: redact_secret(item, secret) for key, item in value.items()}
    return value


def payload_has_error(payload: Any) -> bool:
    if isinstance(payload, dict):
        error_keys = ("error", "errors", "message", "success")
        if any(key in payload for key in error_keys):
            success = payload.get("success")
            if success is False:
                return True
            if payload.get("error") or payload.get("errors"):
                return True
            message = str(payload.get("message") or "").lower()
            if any(token in message for token in ("error", "invalid", "limit", "expired", "denied")):
                return True
    return False


def fetch_history(api_key: str, direction: str, start: date, end: date | None = None) -> tuple[Any, str | None]:
    params = {
        "key": api_key,
        "code": AIRPORT_CODE,
        "type": direction,
        "date_from": start.isoformat(),
    }
    if end is not None and end != start:
        params["date_to"] = end.isoformat()

    try:
        response = requests.get(API_ENDPOINT, params=params, timeout=REQUEST_TIMEOUT_SECONDS)
    except requests.RequestException as exc:
        error = redact_secret(str(exc), api_key)
        return {"request_error": error}, error

    try:
        payload = redact_secret(response.json(), api_key)
    except ValueError:
        payload = {
            "http_status": response.status_code,
            "body": redact_secret(response.text[:2000], api_key),
        }
        return payload, f"Non-JSON response with HTTP {response.status_code}"

    if response.status_code >= 400:
        return payload, f"HTTP {response.status_code}"

    if payload_has_error(payload):
        return payload, "API returned an error payload"

    return payload, None


def save_raw_payload(prefix: str, direction: str, start: date, end: date | None, payload: Any) -> Path:
    suffix = start.isoformat() if end is None or end == start else f"{start.isoformat()}_to_{end.isoformat()}"
    path = RAW_DIR / f"{prefix}_{AIRPORT_CODE.lower()}_{direction}_{suffix}.json"
    safe_json_dump(path, payload)
    return path


def fetch_month_or_days(api_key: str, month_label: str, direction: str, start: date, end: date) -> list[dict[str, Any]]:
    print(f"Fetching {AIRPORT_CODE} {direction} {month_label} as one monthly request")
    monthly_payload, monthly_error = fetch_history(api_key, direction, start, end)
    save_raw_payload("monthly", direction, start, end, monthly_payload)

    monthly_records = extract_records(monthly_payload)
    should_fallback = (
        monthly_error is not None
        or len(monthly_records) == 0
        or len(monthly_records) < MONTHLY_SUSPICIOUSLY_SMALL_ROWS
    )

    if not should_fallback:
        return add_fetch_metadata(monthly_records, month_label, direction, "monthly")

    reason = monthly_error or f"monthly returned {len(monthly_records)} rows"
    print(f"Falling back to daily requests for {AIRPORT_CODE} {direction} {month_label}: {reason}")

    daily_records: list[dict[str, Any]] = []
    for day in date_range(start, end):
        payload, error = fetch_history(api_key, direction, day)
        save_raw_payload("daily", direction, day, day, payload)
        if error:
            print(f"Daily request failed for {direction} {day.isoformat()}: {error}", file=sys.stderr)
        records = extract_records(payload)
        daily_records.extend(add_fetch_metadata(records, month_label, direction, "daily", day.isoformat()))
        time.sleep(REQUEST_PAUSE_SECONDS)

    return daily_records


def add_fetch_metadata(
    records: list[dict[str, Any]],
    month_label: str,
    direction: str,
    fetch_mode: str,
    fetch_date: str | None = None,
) -> list[dict[str, Any]]:
    enriched = []
    for record in records:
        item = dict(record)
        item["_fetch_month"] = month_label
        item["_fetch_direction"] = direction
        item["_fetch_mode"] = fetch_mode
        item["_fetch_date"] = fetch_date
        enriched.append(item)
    return enriched


def nested(record: dict[str, Any], *keys: str) -> Any:
    current: Any = record
    for key in keys:
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


def parse_delay(value: Any) -> float | None:
    if value in (None, ""):
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def parse_datetime(value: Any) -> pd.Timestamp | pd.NaT:
    if value in (None, ""):
        return pd.NaT
    return pd.to_datetime(value, errors="coerce")


def delay_from_times(actual: Any, scheduled: Any) -> float | None:
    actual_ts = parse_datetime(actual)
    scheduled_ts = parse_datetime(scheduled)
    if pd.isna(actual_ts) or pd.isna(scheduled_ts):
        return None
    return (actual_ts - scheduled_ts).total_seconds() / 60


def iso_or_empty(value: Any) -> str | None:
    ts = parse_datetime(value)
    if pd.isna(ts):
        return None
    return ts.isoformat()


def normalize_record(record: dict[str, Any], source_index: int) -> dict[str, Any]:
    status = str(record.get("status") or "")
    arrival_delay = parse_delay(nested(record, "arrival", "delay"))
    if arrival_delay is None:
        arrival_delay = delay_from_times(
            nested(record, "arrival", "actualTime"),
            nested(record, "arrival", "scheduledTime"),
        )

    departure_delay = parse_delay(nested(record, "departure", "delay"))
    if departure_delay is None:
        departure_delay = delay_from_times(
            nested(record, "departure", "actualTime"),
            nested(record, "departure", "scheduledTime"),
        )

    departure_iata = nested(record, "departure", "iataCode")
    arrival_iata = nested(record, "arrival", "iataCode")
    flight_iata = nested(record, "flight", "iataNumber")
    flight_number = nested(record, "flight", "number")
    airline_iata = nested(record, "airline", "iataCode")
    airline_name = nested(record, "airline", "name")
    codeshare_airline_iata = nested(record, "codeshared", "airline", "iataCode")
    codeshare_flight_iata = nested(record, "codeshared", "flight", "iataNumber")

    needs_manual_review = arrival_delay is None and "cancel" not in status.lower()

    return {
        "source_index": source_index,
        "fetch_month": record.get("_fetch_month"),
        "fetch_direction": record.get("_fetch_direction") or record.get("type"),
        "fetch_mode": record.get("_fetch_mode"),
        "fetch_date": record.get("_fetch_date"),
        "api_type": record.get("type"),
        "status": status or None,
        "is_cancelled": "cancelled" in status.lower() or "canceled" in status.lower(),
        "is_arrival_delay_3h_plus": bool(arrival_delay is not None and arrival_delay >= 180),
        "needs_manual_review": needs_manual_review,
        "departure_iata": departure_iata,
        "arrival_iata": arrival_iata,
        "route": f"{departure_iata or ''}-{arrival_iata or ''}",
        "airline_iata": airline_iata,
        "airline_icao": nested(record, "airline", "icaoCode"),
        "airline_name": airline_name,
        "flight_number": flight_number,
        "flight_iata": flight_iata,
        "flight_icao": nested(record, "flight", "icaoNumber"),
        "codeshare_airline_iata": codeshare_airline_iata,
        "codeshare_airline_name": nested(record, "codeshared", "airline", "name"),
        "codeshare_flight_iata": codeshare_flight_iata,
        "departure_scheduled_time": iso_or_empty(nested(record, "departure", "scheduledTime")),
        "departure_estimated_time": iso_or_empty(nested(record, "departure", "estimatedTime")),
        "departure_actual_time": iso_or_empty(nested(record, "departure", "actualTime")),
        "arrival_scheduled_time": iso_or_empty(nested(record, "arrival", "scheduledTime")),
        "arrival_estimated_time": iso_or_empty(nested(record, "arrival", "estimatedTime")),
        "arrival_actual_time": iso_or_empty(nested(record, "arrival", "actualTime")),
        "departure_delay_minutes": departure_delay,
        "arrival_delay_minutes": arrival_delay,
        "departure_terminal": nested(record, "departure", "terminal"),
        "departure_gate": nested(record, "departure", "gate"),
        "arrival_terminal": nested(record, "arrival", "terminal"),
        "arrival_gate": nested(record, "arrival", "gate"),
        "raw_has_codeshare": bool(nested(record, "codeshared")),
        "raw_json": json.dumps(record, ensure_ascii=False, sort_keys=True),
    }


def add_dedup_columns(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        df["dedup_group_id"] = []
        df["dedup_rank"] = []
        df["is_dedup_primary"] = []
        return df

    group_columns = [
        "fetch_direction",
        "departure_iata",
        "arrival_iata",
        "departure_scheduled_time",
        "arrival_scheduled_time",
        "departure_actual_time",
        "arrival_actual_time",
        "status",
    ]

    def make_group(row: pd.Series) -> str:
        values = [str(row.get(column) or "") for column in group_columns]
        key = "|".join(values)
        return hashlib.sha1(key.encode("utf-8")).hexdigest()[:16]

    df = df.copy()
    df["dedup_group_id"] = df.apply(make_group, axis=1)
    df["dedup_rank"] = df.groupby("dedup_group_id").cumcount() + 1
    df["is_dedup_primary"] = df["dedup_rank"] == 1
    return df


def deduped(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df.copy()
    return df[df["is_dedup_primary"]].copy()


def count_true(series: pd.Series) -> int:
    return int(series.fillna(False).astype(bool).sum())


def write_reports(df: pd.DataFrame) -> None:
    primary = deduped(df)

    if df.empty:
        empty = pd.DataFrame()
        empty.to_csv(REPORTS_DIR / "monthly_summary.csv", index=False)
        empty.to_csv(REPORTS_DIR / "airline_breakdown.csv", index=False)
        empty.to_csv(REPORTS_DIR / "route_breakdown.csv", index=False)
        empty.to_csv(REPORTS_DIR / "top_candidate_events.csv", index=False)
        return

    monthly_rows = []
    for keys, group in df.groupby(["fetch_month", "fetch_direction"], dropna=False):
        month, direction = keys
        primary_group = primary[
            (primary["fetch_month"] == month) & (primary["fetch_direction"] == direction)
        ]
        monthly_rows.append(
            {
                "month": month,
                "direction": direction,
                "raw_count": len(group),
                "deduped_count": len(primary_group),
                "raw_cancelled_count": count_true(group["is_cancelled"]),
                "deduped_cancelled_count": count_true(primary_group["is_cancelled"]),
                "raw_arrival_delay_3h_plus_count": count_true(group["is_arrival_delay_3h_plus"]),
                "deduped_arrival_delay_3h_plus_count": count_true(primary_group["is_arrival_delay_3h_plus"]),
                "needs_manual_review_count": count_true(group["needs_manual_review"]),
            }
        )
    pd.DataFrame(monthly_rows).sort_values(["month", "direction"]).to_csv(
        REPORTS_DIR / "monthly_summary.csv", index=False
    )

    write_breakdown(
        df,
        primary,
        ["airline_iata", "airline_name"],
        REPORTS_DIR / "airline_breakdown.csv",
    )
    write_breakdown(
        df,
        primary,
        ["route", "departure_iata", "arrival_iata"],
        REPORTS_DIR / "route_breakdown.csv",
    )

    candidate_columns = [
        "fetch_month",
        "fetch_direction",
        "flight_iata",
        "airline_iata",
        "airline_name",
        "route",
        "status",
        "is_cancelled",
        "is_arrival_delay_3h_plus",
        "arrival_delay_minutes",
        "departure_scheduled_time",
        "arrival_scheduled_time",
        "arrival_actual_time",
        "needs_manual_review",
        "dedup_group_id",
    ]
    candidates = primary[
        primary["is_cancelled"] | primary["is_arrival_delay_3h_plus"] | primary["needs_manual_review"]
    ][candidate_columns].copy()
    candidates = candidates.sort_values(
        ["is_cancelled", "is_arrival_delay_3h_plus", "arrival_delay_minutes"],
        ascending=[False, False, False],
        na_position="last",
    )
    candidates.to_csv(REPORTS_DIR / "top_candidate_events.csv", index=False)


def write_breakdown(df: pd.DataFrame, primary: pd.DataFrame, columns: list[str], output_path: Path) -> None:
    raw_grouped = (
        df.groupby(columns, dropna=False)
        .agg(
            raw_count=("source_index", "count"),
            raw_cancelled_count=("is_cancelled", count_true),
            raw_arrival_delay_3h_plus_count=("is_arrival_delay_3h_plus", count_true),
            needs_manual_review_count=("needs_manual_review", count_true),
        )
        .reset_index()
    )
    deduped_grouped = (
        primary.groupby(columns, dropna=False)
        .agg(
            deduped_count=("source_index", "count"),
            deduped_cancelled_count=("is_cancelled", count_true),
            deduped_arrival_delay_3h_plus_count=("is_arrival_delay_3h_plus", count_true),
        )
        .reset_index()
    )
    merged = raw_grouped.merge(deduped_grouped, on=columns, how="left").fillna(0)
    merged = merged.sort_values(["deduped_count", "raw_count"], ascending=False)
    merged.to_csv(output_path, index=False)


def main() -> None:
    load_dotenv()
    ensure_dirs()

    api_key = os.getenv("AVIATION_EDGE_API_KEY")
    if not api_key:
        fail("AVIATION_EDGE_API_KEY is missing. Add it as a GitHub repository secret before running the workflow.")

    all_records: list[dict[str, Any]] = []
    for month_label, start, end in MONTHS:
        for direction in DIRECTIONS:
            all_records.extend(fetch_month_or_days(api_key, month_label, direction, start, end))

    normalized_rows = [normalize_record(record, index) for index, record in enumerate(all_records, start=1)]
    df = pd.DataFrame(normalized_rows)
    df = add_dedup_columns(df)

    normalized_path = PROCESSED_DIR / "beg_flights_normalized.csv"
    df.to_csv(normalized_path, index=False)
    write_reports(df)

    print(f"Finished. Raw rows: {len(df)}. Deduped rows: {len(deduped(df))}.")
    print(f"Normalized CSV: {normalized_path.relative_to(ROOT)}")
    print(f"Reports directory: {REPORTS_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
