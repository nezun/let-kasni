#!/usr/bin/env python3
"""Fetch and summarize BEG historical flights from Aviation Edge.

This script is intended to run in GitHub Actions with AVIATION_EDGE_API_KEY
provided through repository secrets. It is a data-validation utility, not a
legal eligibility engine.
"""

from __future__ import annotations

import calendar
import hashlib
import json
import os
import sys
import time
from collections import Counter, defaultdict
from datetime import date, timedelta
from pathlib import Path
from typing import Any

import pandas as pd
import requests
from dotenv import load_dotenv


API_ENDPOINT = "https://aviation-edge.com/v2/public/flightsHistory"
AIRPORT_CODE = "BEG"
PERIOD_START = date(2025, 4, 1)
PERIOD_END = date(2026, 3, 31)
MAX_API_RANGE_DAYS = 30
REQUEST_TIMEOUT_SECONDS = 45
OPTIONAL_LOOKUP_TIMEOUT_SECONDS = 12
REQUEST_PAUSE_SECONDS = 0.25
SUSPICIOUS_BEG_CHUNK_MIN_ROWS = 10
DESTINATION_LOOKUP_MAX_REQUESTS_PER_MONTH = 40
FETCH_ISSUES: list[dict[str, Any]] = []

ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw"
PROCESSED_DIR = ROOT / "data" / "processed"
REPORTS_DIR = ROOT / "reports"

EU_EEA_UK_CH_AIRPORTS = {
    "agp",
    "alc",
    "ams",
    "arn",
    "ath",
    "bcn",
    "bds",
    "ber",
    "bgy",
    "bhx",
    "bll",
    "blq",
    "boj",
    "bri",
    "brs",
    "bru",
    "bsl",
    "bts",
    "bud",
    "bva",
    "cag",
    "cdg",
    "cgn",
    "cia",
    "clj",
    "cph",
    "crl",
    "cta",
    "dbv",
    "dtm",
    "dub",
    "dus",
    "edi",
    "ein",
    "fco",
    "fkb",
    "flr",
    "fmm",
    "fra",
    "gdn",
    "got",
    "gva",
    "haj",
    "ham",
    "hel",
    "hhn",
    "ibz",
    "inn",
    "krk",
    "ktw",
    "lca",
    "lgw",
    "lhr",
    "lin",
    "lju",
    "ltn",
    "lux",
    "lys",
    "mad",
    "man",
    "mla",
    "muc",
    "mxp",
    "nap",
    "nce",
    "nue",
    "nyo",
    "osl",
    "osi",
    "ory",
    "otp",
    "pmi",
    "prg",
    "psa",
    "puy",
    "rix",
    "rjk",
    "rtm",
    "skg",
    "sof",
    "spu",
    "stn",
    "str",
    "szg",
    "tll",
    "trf",
    "trn",
    "tsf",
    "tsr",
    "var",
    "vce",
    "vie",
    "vlc",
    "vno",
    "waw",
    "wmi",
    "wro",
    "zag",
    "zrh",
}

NON_EU_AIRPORTS = {
    "beg",
    "doh",
    "dxb",
    "jfk",
    "led",
    "los",
    "saw",
    "tlv",
}

EU_EEA_UK_CH_AIRLINES = {
    "a3",
    "af",
    "ay",
    "az",
    "ba",
    "bt",
    "d8",
    "de",
    "dy",
    "ei",
    "en",
    "ew",
    "fb",
    "fr",
    "hv",
    "ib",
    "kl",
    "lg",
    "lh",
    "lo",
    "lx",
    "os",
    "ou",
    "ro",
    "sk",
    "sn",
    "to",
    "tp",
    "u2",
    "v7",
    "vy",
    "w6",
    "x3",
}

NORMALIZED_COLUMNS = [
    "fetch_month",
    "date",
    "direction",
    "airline_iata",
    "airline_name",
    "flight_iata",
    "flight_number",
    "dep_airport",
    "arr_airport",
    "route",
    "scheduled_departure",
    "actual_departure",
    "scheduled_arrival",
    "actual_arrival",
    "departure_delay_minutes",
    "arrival_delay_minutes",
    "status",
    "is_cancelled",
    "is_arrival_delay_3h_plus",
    "needs_manual_review",
    "manual_review_reason",
    "dedup_group_id",
    "marketing_airlines",
    "likely_operating_airline_iata",
    "likely_operating_airline_name",
    "operating_carrier_confidence",
    "arrival_data_source",
    "arrival_match_confidence",
    "candidate_reason",
    "candidate_confidence",
    "dep_region",
    "arr_region",
    "eu_eea_uk_ch_airport_involved",
    "likely_eu261_scope",
    "eu261_precheck_reason",
    "raw_source_file",
]

INTERNAL_COLUMNS = [
    "source_index",
    "arrival_delay_source",
    "raw_has_codeshare",
    "codeshare_airline_iata",
    "codeshare_airline_name",
    "arrival_data_conflict",
    "dedup_rank",
    "is_dedup_primary",
    "raw_json",
]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    sys.exit(1)


def record_fetch_issue(
    stage: str,
    airport_code: str,
    direction: str,
    start: date,
    end: date,
    error: str,
    payload: Any,
    hard_fail_enabled: bool,
) -> None:
    FETCH_ISSUES.append(
        {
            "stage": stage,
            "airport": airport_code.upper(),
            "direction": direction,
            "date_from": start.isoformat(),
            "date_to": end.isoformat(),
            "hard_fail_enabled": hard_fail_enabled,
            "error": error,
            "payload_summary": summarize_payload(payload),
        }
    )


def ensure_dirs() -> None:
    for path in (RAW_DIR, PROCESSED_DIR, REPORTS_DIR):
        path.mkdir(parents=True, exist_ok=True)


def safe_json_dump(path: Path, payload: Any) -> None:
    with path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2, sort_keys=True)


def month_starts(start: date, end: date) -> list[date]:
    months = []
    current = date(start.year, start.month, 1)
    while current <= end:
        months.append(current)
        month_index = current.month
        year = current.year + (1 if month_index == 12 else 0)
        month = 1 if month_index == 12 else month_index + 1
        current = date(year, month, 1)
    return months


def month_end(month_start: date) -> date:
    return date(month_start.year, month_start.month, calendar.monthrange(month_start.year, month_start.month)[1])


def analysis_months() -> list[tuple[str, date, date]]:
    months = []
    for start in month_starts(PERIOD_START, PERIOD_END):
        end = min(month_end(start), PERIOD_END)
        if end >= PERIOD_START:
            months.append((start.strftime("%Y-%m"), max(start, PERIOD_START), end))
    return months


def chunk_range(start: date, end: date) -> list[tuple[date, date]]:
    chunks = []
    current = start
    while current <= end:
        chunk_end = min(current + timedelta(days=MAX_API_RANGE_DAYS - 1), end)
        chunks.append((current, chunk_end))
        current = chunk_end + timedelta(days=1)
    return chunks


def date_range(start: date, end: date) -> list[date]:
    days = []
    current = start
    while current <= end:
        days.append(current)
        current += timedelta(days=1)
    return days


def normalized_string(value: Any) -> str:
    return str(value or "").strip().lower()


def clean_name(value: Any) -> str:
    return " ".join(str(value or "").strip().lower().split())


def parse_datetime(value: Any) -> pd.Timestamp | pd.NaT:
    if value in (None, ""):
        return pd.NaT
    return pd.to_datetime(value, errors="coerce")


def iso_or_empty(value: Any) -> str | None:
    ts = parse_datetime(value)
    if pd.isna(ts):
        return None
    return ts.isoformat()


def date_part(value: Any) -> str | None:
    ts = parse_datetime(value)
    if pd.isna(ts):
        return None
    return ts.date().isoformat()


def minutes_between(later: Any, earlier: Any) -> float | None:
    later_ts = parse_datetime(later)
    earlier_ts = parse_datetime(earlier)
    if pd.isna(later_ts) or pd.isna(earlier_ts):
        return None
    return (later_ts - earlier_ts).total_seconds() / 60


def minutes_apart(first: Any, second: Any) -> float | None:
    first_ts = parse_datetime(first)
    second_ts = parse_datetime(second)
    if pd.isna(first_ts) or pd.isna(second_ts):
        return None
    return abs((first_ts - second_ts).total_seconds() / 60)


def parse_delay(value: Any) -> float | None:
    if value in (None, ""):
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def nested(record: dict[str, Any], *keys: str) -> Any:
    current: Any = record
    for key in keys:
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


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
        if payload.get("success") is False:
            return True
        if payload.get("error") or payload.get("errors"):
            return True
        message = str(payload.get("message") or "").lower()
        if any(token in message for token in ("error", "invalid", "limit", "expired", "denied")):
            return True
    return False


def payload_says_no_older_data(payload: Any) -> bool:
    return "no older data" in summarize_payload(payload).lower() or "code#32" in summarize_payload(payload).lower()


def is_timeout_error(error: str | None) -> bool:
    return "timed out" in str(error or "").lower() or "timeout" in str(error or "").lower()


def fetch_history(
    api_key: str,
    airport_code: str,
    direction: str,
    start: date,
    end: date | None = None,
    timeout_seconds: int = REQUEST_TIMEOUT_SECONDS,
) -> tuple[Any, str | None]:
    params = {
        "key": api_key,
        "code": airport_code.upper(),
        "type": direction,
        "date_from": start.isoformat(),
    }
    if end is not None and end != start:
        params["date_to"] = end.isoformat()

    try:
        response = requests.get(API_ENDPOINT, params=params, timeout=timeout_seconds)
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


def fetch_records_for_period(
    api_key: str,
    airport_code: str,
    direction: str,
    start: date,
    end: date,
    fallback_on_small: bool,
    fail_on_api_error: bool = True,
    timeout_seconds: int = REQUEST_TIMEOUT_SECONDS,
) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for chunk_start, chunk_end in chunk_range(start, end):
        payload, error = fetch_history(api_key, airport_code, direction, chunk_start, chunk_end, timeout_seconds)
        chunk_records = extract_records(payload)

        if error is not None:
            message = (
                f"{airport_code.upper()} {direction} {chunk_start.isoformat()} to {chunk_end.isoformat()} "
                f"failed: {error}. Payload: {summarize_payload(payload)}"
            )
            record_fetch_issue(
                "chunk",
                airport_code,
                direction,
                chunk_start,
                chunk_end,
                error,
                payload,
                fail_on_api_error,
            )
            if fail_on_api_error:
                fail(message)
            print(f"Recording fetch issue and continuing: {message}", file=sys.stderr)
            continue

        should_fallback = len(chunk_records) == 0 and chunk_start != chunk_end
        if fallback_on_small and (chunk_end - chunk_start).days >= 6 and len(chunk_records) < SUSPICIOUS_BEG_CHUNK_MIN_ROWS:
            should_fallback = True

        if should_fallback:
            reason = f"chunk returned {len(chunk_records)} rows"
            record_fetch_issue(
                "chunk_daily_fallback",
                airport_code,
                direction,
                chunk_start,
                chunk_end,
                reason,
                payload,
                fail_on_api_error,
            )
            print(
                f"Falling back to daily requests for {airport_code.upper()} {direction} "
                f"{chunk_start.isoformat()} to {chunk_end.isoformat()}: {reason}"
            )
            for day in date_range(chunk_start, chunk_end):
                daily_payload, daily_error = fetch_history(api_key, airport_code, direction, day, day, timeout_seconds)
                if daily_error:
                    message = (
                        f"{airport_code.upper()} {direction} {day.isoformat()} failed: "
                        f"{daily_error}. Payload: {summarize_payload(daily_payload)}"
                    )
                    record_fetch_issue(
                        "daily_fallback",
                        airport_code,
                        direction,
                        day,
                        day,
                        daily_error,
                        daily_payload,
                        fail_on_api_error,
                    )
                    if fail_on_api_error:
                        fail(message)
                    print(f"Recording fetch issue and continuing: {message}", file=sys.stderr)
                else:
                    records.extend(extract_records(daily_payload))
                time.sleep(REQUEST_PAUSE_SECONDS)
        else:
            records.extend(chunk_records)

        time.sleep(REQUEST_PAUSE_SECONDS)
    return records


def summarize_payload(payload: Any) -> str:
    if isinstance(payload, dict):
        summary = {
            key: payload.get(key)
            for key in ("error", "errors", "message", "success", "http_status", "request_error")
            if key in payload
        }
        return json.dumps(summary or payload, ensure_ascii=False)[:500]
    if isinstance(payload, list):
        return f"list[{len(payload)}]"
    return str(payload)[:500]


def raw_filename(month_label: str, direction: str) -> str:
    plural = "arrivals" if direction == "arrival" else "departures"
    return f"{month_label}-{plural}.json"


def fetch_beg_month(
    api_key: str,
    month_label: str,
    direction: str,
    start: date,
    end: date,
    strict_fetch: bool,
) -> list[dict[str, Any]]:
    print(f"Fetching BEG {direction} {month_label} in API-safe chunks")
    records = fetch_records_for_period(
        api_key,
        AIRPORT_CODE,
        direction,
        start,
        end,
        fallback_on_small=True,
        fail_on_api_error=strict_fetch,
    )
    source_file = raw_filename(month_label, direction)
    safe_json_dump(RAW_DIR / source_file, records)
    return add_fetch_metadata(records, month_label, direction, source_file)


def add_fetch_metadata(
    records: list[dict[str, Any]],
    month_label: str,
    direction: str,
    raw_source_file: str,
) -> list[dict[str, Any]]:
    enriched = []
    for record in records:
        item = dict(record)
        item["_fetch_month"] = month_label
        item["_fetch_direction"] = direction
        item["_raw_source_file"] = raw_source_file
        enriched.append(item)
    return enriched


def scheduled_arrival_date(record: dict[str, Any]) -> date | None:
    ts = parse_datetime(nested(record, "arrival", "scheduledTime") or nested(record, "arrival", "estimatedTime"))
    if pd.isna(ts):
        ts = parse_datetime(nested(record, "departure", "scheduledTime"))
    if pd.isna(ts):
        return None
    return ts.date()


def has_weak_arrival_evidence(record: dict[str, Any]) -> bool:
    if normalized_string(record.get("_fetch_direction")) != "departure":
        return False
    status = normalized_string(record.get("status"))
    actual_arrival = nested(record, "arrival", "actualTime")
    arrival_delay = nested(record, "arrival", "delay")
    estimated_arrival = nested(record, "arrival", "estimatedTime")
    if not actual_arrival:
        return True
    if arrival_delay in (None, ""):
        return True
    if estimated_arrival and not actual_arrival:
        return True
    if status not in {"landed", "cancelled", "canceled"}:
        return True
    return False


def flight_identifiers(record: dict[str, Any]) -> set[str]:
    identifiers = {
        normalized_string(nested(record, "flight", "iataNumber")),
        normalized_string(nested(record, "flight", "icaoNumber")),
        normalized_string(nested(record, "codeshared", "flight", "iataNumber")),
        normalized_string(nested(record, "codeshared", "flight", "icaoNumber")),
    }
    return {item for item in identifiers if item}


def match_destination_arrival(departure_record: dict[str, Any], arrival_rows: list[dict[str, Any]]) -> tuple[dict[str, Any] | None, str]:
    dep_ids = flight_identifiers(departure_record)
    dep_airport = normalized_string(nested(departure_record, "departure", "iataCode"))
    arr_airport = normalized_string(nested(departure_record, "arrival", "iataCode"))
    dep_sched = nested(departure_record, "departure", "scheduledTime")
    arr_sched = nested(departure_record, "arrival", "scheduledTime")

    best: tuple[int, dict[str, Any] | None] = (0, None)
    for candidate in arrival_rows:
        score = 0
        cand_ids = flight_identifiers(candidate)
        if dep_ids and cand_ids and dep_ids & cand_ids:
            score += 50
        if normalized_string(nested(candidate, "departure", "iataCode")) == dep_airport:
            score += 20
        if normalized_string(nested(candidate, "arrival", "iataCode")) == arr_airport:
            score += 20
        dep_diff = minutes_apart(dep_sched, nested(candidate, "departure", "scheduledTime"))
        if dep_diff is not None and dep_diff <= 90:
            score += 15
        arr_diff = minutes_apart(arr_sched, nested(candidate, "arrival", "scheduledTime"))
        if arr_diff is not None and arr_diff <= 90:
            score += 15
        if score > best[0]:
            best = (score, candidate)

    score, match = best
    if match is None or score < 35:
        return None, "no_match"
    if score >= 85:
        return match, "high"
    if score >= 60:
        return match, "medium"
    return match, "low"


def enrich_departures_with_destination_arrivals(
    api_key: str,
    month_label: str,
    departure_records: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    weak_records = [record for record in departure_records if has_weak_arrival_evidence(record)]
    lookup_dates_by_airport: dict[str, set[date]] = defaultdict(set)
    for record in weak_records:
        destination = normalized_string(nested(record, "arrival", "iataCode"))
        arrival_date = scheduled_arrival_date(record)
        if destination and destination != AIRPORT_CODE.lower() and arrival_date:
            lookup_dates_by_airport[destination].add(arrival_date)

    arrival_cache: dict[tuple[str, date], list[dict[str, Any]]] = {}
    destination_raw: dict[str, dict[str, list[dict[str, Any]]]] = {}
    skipped_lookup_count = 0
    lookup_request_count = 0
    for airport, lookup_dates in sorted(lookup_dates_by_airport.items()):
        destination_raw[airport] = {}
        skip_remaining_airport_dates = False
        for lookup_date in sorted(lookup_dates):
            if skip_remaining_airport_dates or lookup_request_count >= DESTINATION_LOOKUP_MAX_REQUESTS_PER_MONTH:
                skipped_lookup_count += 1
                arrival_cache[(airport, lookup_date)] = []
                destination_raw[airport][lookup_date.isoformat()] = []
                continue

            lookup_request_count += 1
            payload, error = fetch_history(
                api_key,
                airport,
                "arrival",
                lookup_date,
                lookup_date,
                OPTIONAL_LOOKUP_TIMEOUT_SECONDS,
            )
            records = extract_records(payload)
            if error is not None:
                record_fetch_issue(
                    "destination_arrival_lookup",
                    airport,
                    "arrival",
                    lookup_date,
                    lookup_date,
                    error,
                    payload,
                    False,
                )
                if payload_says_no_older_data(payload) or is_timeout_error(error):
                    skip_remaining_airport_dates = True
                records = []
            arrival_cache[(airport, lookup_date)] = records
            destination_raw[airport][lookup_date.isoformat()] = records

    if skipped_lookup_count:
        record_fetch_issue(
            "destination_arrival_lookup_skipped",
            AIRPORT_CODE,
            "departure",
            scheduled_arrival_date(departure_records[0]) or date.fromisoformat(f"{month_label}-01"),
            scheduled_arrival_date(departure_records[-1]) or date.fromisoformat(f"{month_label}-01"),
            f"Skipped {skipped_lookup_count} destination-arrival lookups after API no-older-data/timeouts or monthly budget",
            {"skipped_lookup_count": skipped_lookup_count, "monthly_budget": DESTINATION_LOOKUP_MAX_REQUESTS_PER_MONTH},
            False,
        )

    if destination_raw:
        safe_json_dump(RAW_DIR / f"{month_label}-destination-arrival-lookups.json", destination_raw)

    enriched = []
    for record in departure_records:
        item = dict(record)
        item["_destination_arrival_match"] = None
        item["_arrival_data_source"] = "original_beg_departure" if not has_weak_arrival_evidence(record) else "unavailable"
        item["_arrival_match_confidence"] = "no_match"

        if has_weak_arrival_evidence(record):
            destination = normalized_string(nested(record, "arrival", "iataCode"))
            arrival_date = scheduled_arrival_date(record)
            candidates = arrival_cache.get((destination, arrival_date), []) if arrival_date else []
            match, confidence = match_destination_arrival(record, candidates)
            if match is not None:
                item["_destination_arrival_match"] = match
                item["_arrival_data_source"] = "destination_arrival_lookup"
                item["_arrival_match_confidence"] = confidence

        enriched.append(item)
    return enriched


def enriched_arrival_value(record: dict[str, Any], *keys: str) -> Any:
    match = record.get("_destination_arrival_match")
    if isinstance(match, dict):
        value = nested(match, "arrival", *keys)
        if value not in (None, ""):
            return value
    return nested(record, "arrival", *keys)


def enriched_status(record: dict[str, Any]) -> str:
    match = record.get("_destination_arrival_match")
    if isinstance(match, dict) and match.get("status"):
        return str(match.get("status"))
    return str(record.get("status") or "")


def has_destination_arrival_conflict(record: dict[str, Any]) -> bool:
    match = record.get("_destination_arrival_match")
    if not isinstance(match, dict):
        return False

    original_status = normalized_string(record.get("status"))
    matched_status = normalized_string(match.get("status"))
    if original_status and matched_status and original_status != matched_status:
        return True

    original_delay = parse_delay(nested(record, "arrival", "delay"))
    matched_delay = parse_delay(nested(match, "arrival", "delay"))
    if original_delay is not None and matched_delay is not None and abs(original_delay - matched_delay) > 15:
        return True

    time_pairs = [
        (nested(record, "arrival", "scheduledTime"), nested(match, "arrival", "scheduledTime"), 30),
        (nested(record, "arrival", "actualTime"), nested(match, "arrival", "actualTime"), 30),
    ]
    return any(
        diff is not None and diff > max_minutes
        for first, second, max_minutes in time_pairs
        for diff in [minutes_apart(first, second)]
    )


def normalize_record(record: dict[str, Any], source_index: int) -> dict[str, Any]:
    direction = normalized_string(record.get("_fetch_direction") or record.get("type"))
    dep_airport = normalized_string(nested(record, "departure", "iataCode"))
    arr_airport = normalized_string(nested(record, "arrival", "iataCode"))
    status = enriched_status(record)

    scheduled_departure = iso_or_empty(nested(record, "departure", "scheduledTime"))
    actual_departure = iso_or_empty(nested(record, "departure", "actualTime"))
    scheduled_arrival = iso_or_empty(enriched_arrival_value(record, "scheduledTime"))
    actual_arrival = iso_or_empty(enriched_arrival_value(record, "actualTime"))
    estimated_arrival = iso_or_empty(enriched_arrival_value(record, "estimatedTime"))

    explicit_arrival_delay = parse_delay(enriched_arrival_value(record, "delay"))
    computed_arrival_delay = minutes_between(actual_arrival, scheduled_arrival)
    estimated_arrival_delay = minutes_between(estimated_arrival, scheduled_arrival)
    if explicit_arrival_delay is not None:
        arrival_delay = explicit_arrival_delay
        arrival_delay_source = "explicit_api"
    elif computed_arrival_delay is not None:
        arrival_delay = computed_arrival_delay
        arrival_delay_source = "actual_time_delta"
    elif estimated_arrival_delay is not None:
        arrival_delay = estimated_arrival_delay
        arrival_delay_source = "estimated_time_delta"
    else:
        arrival_delay = None
        arrival_delay_source = "missing"

    departure_delay = parse_delay(nested(record, "departure", "delay"))
    if departure_delay is None:
        departure_delay = minutes_between(actual_departure, scheduled_departure)

    is_cancelled = "cancelled" in status.lower() or "canceled" in status.lower()
    is_arrival_delay_3h_plus = bool(
        arrival_delay is not None
        and arrival_delay >= 180
        and arrival_delay_source in {"explicit_api", "actual_time_delta"}
    )

    arrival_data_source = record.get("_arrival_data_source") or "original_beg_departure"
    arrival_match_confidence = record.get("_arrival_match_confidence") or "no_match"
    arrival_data_conflict = has_destination_arrival_conflict(record)
    manual_reasons = manual_review_reasons(
        record,
        status,
        arrival_delay,
        arrival_delay_source,
        arrival_data_source,
        arrival_match_confidence,
        arrival_data_conflict,
    )

    return {
        "source_index": source_index,
        "fetch_month": record.get("_fetch_month"),
        "date": date_part(scheduled_departure or scheduled_arrival),
        "direction": direction,
        "airline_iata": normalized_string(nested(record, "airline", "iataCode")),
        "airline_name": clean_name(nested(record, "airline", "name")),
        "flight_iata": normalized_string(nested(record, "flight", "iataNumber")),
        "flight_number": str(nested(record, "flight", "number") or ""),
        "dep_airport": dep_airport,
        "arr_airport": arr_airport,
        "route": f"{dep_airport or ''}-{arr_airport or ''}",
        "scheduled_departure": scheduled_departure,
        "actual_departure": actual_departure,
        "scheduled_arrival": scheduled_arrival,
        "actual_arrival": actual_arrival,
        "departure_delay_minutes": departure_delay,
        "arrival_delay_minutes": arrival_delay,
        "arrival_delay_source": arrival_delay_source,
        "arrival_data_conflict": arrival_data_conflict,
        "status": status or None,
        "is_cancelled": is_cancelled,
        "is_arrival_delay_3h_plus": is_arrival_delay_3h_plus,
        "needs_manual_review": bool(manual_reasons),
        "manual_review_reason": "; ".join(manual_reasons) if manual_reasons else None,
        "raw_has_codeshare": bool(nested(record, "codeshared")),
        "codeshare_airline_iata": normalized_string(nested(record, "codeshared", "airline", "iataCode")),
        "codeshare_airline_name": clean_name(nested(record, "codeshared", "airline", "name")),
        "codeshare_flight_iata": normalized_string(nested(record, "codeshared", "flight", "iataNumber")),
        "flight_icao": normalized_string(nested(record, "flight", "icaoNumber")),
        "arrival_data_source": arrival_data_source,
        "arrival_match_confidence": arrival_match_confidence,
        "raw_source_file": record.get("_raw_source_file"),
        "raw_json": json.dumps(record, ensure_ascii=False, sort_keys=True),
    }


def manual_review_reasons(
    record: dict[str, Any],
    status: str,
    arrival_delay: float | None,
    arrival_delay_source: str,
    arrival_data_source: str,
    arrival_match_confidence: str,
    arrival_data_conflict: bool,
) -> list[str]:
    reasons = []
    if not status:
        reasons.append("unknown_status")
    if arrival_delay is None and "cancel" not in status.lower():
        reasons.append("missing_final_arrival_evidence")
    if arrival_delay_source == "estimated_time_delta":
        reasons.append("estimated_only_arrival_evidence")
    if normalized_string(record.get("_fetch_direction")) == "departure" and arrival_data_source == "unavailable":
        reasons.append("weak_beg_departure_endpoint_evidence")
    if arrival_match_confidence == "low":
        reasons.append("low_confidence_destination_arrival_match")
    if arrival_data_conflict:
        reasons.append("destination_arrival_lookup_conflict")
    return reasons


def add_dedup_columns(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        df = df.copy()
        df["dedup_group_id"] = []
        df["dedup_rank"] = []
        df["is_dedup_primary"] = []
        return df

    group_columns = [
        "direction",
        "dep_airport",
        "arr_airport",
        "scheduled_departure",
        "scheduled_arrival",
        "status",
    ]

    def make_group(row: pd.Series) -> str:
        key = "|".join(str(row.get(column) or "") for column in group_columns)
        return hashlib.sha1(key.encode("utf-8")).hexdigest()[:16]

    df = df.copy()
    df["dedup_group_id"] = df.apply(make_group, axis=1)
    df["dedup_rank"] = df.groupby("dedup_group_id").cumcount() + 1
    df["is_dedup_primary"] = df["dedup_rank"] == 1
    return df


def add_operating_carrier_columns(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        df = df.copy()
        df["marketing_airlines"] = []
        df["likely_operating_airline_iata"] = []
        df["likely_operating_airline_name"] = []
        df["operating_carrier_confidence"] = []
        return df

    rows = []
    for group_id, group in df.groupby("dedup_group_id", dropna=False):
        marketing_airlines = sorted(
            {
                f"{row.airline_iata}:{row.airline_name}".strip(":")
                for row in group.itertuples()
                if row.airline_iata or row.airline_name
            }
        )

        non_codeshare = group[group["raw_has_codeshare"] == False]  # noqa: E712
        unique_non_codeshare = sorted(set(non_codeshare["airline_iata"].dropna()) - {""})
        codeshare_operator_counts = Counter(group["codeshare_airline_iata"].dropna())
        codeshare_operator_counts.pop("", None)

        if len(unique_non_codeshare) == 1:
            operator = non_codeshare[non_codeshare["airline_iata"] == unique_non_codeshare[0]].iloc[0]
            operator_iata = operator.get("airline_iata")
            operator_name = operator.get("airline_name")
            confidence = "high"
        elif len(unique_non_codeshare) > 1:
            operator_iata = unique_non_codeshare[0]
            operator_name = clean_name(non_codeshare[non_codeshare["airline_iata"] == operator_iata].iloc[0].get("airline_name"))
            confidence = "low"
        elif len(codeshare_operator_counts) == 1:
            operator_iata = next(iter(codeshare_operator_counts))
            operator_name = clean_name(group[group["codeshare_airline_iata"] == operator_iata].iloc[0].get("codeshare_airline_name"))
            confidence = "medium"
        else:
            operator_iata = normalized_string(group.iloc[0].get("airline_iata"))
            operator_name = clean_name(group.iloc[0].get("airline_name"))
            confidence = "low"

        rows.append(
            {
                "dedup_group_id": group_id,
                "marketing_airlines": "; ".join(marketing_airlines),
                "likely_operating_airline_iata": operator_iata,
                "likely_operating_airline_name": operator_name,
                "operating_carrier_confidence": confidence,
            }
        )

    return df.merge(pd.DataFrame(rows), on="dedup_group_id", how="left")


def airport_region(iata: str) -> str:
    iata = normalized_string(iata)
    if iata in EU_EEA_UK_CH_AIRPORTS:
        return "eu_eea_uk_ch"
    if iata in NON_EU_AIRPORTS or iata:
        return "non_eu"
    return "unknown"


def add_candidate_and_scope_columns(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    if df.empty:
        for column in [
            "candidate_reason",
            "candidate_confidence",
            "dep_region",
            "arr_region",
            "eu_eea_uk_ch_airport_involved",
            "likely_eu261_scope",
            "eu261_precheck_reason",
        ]:
            df[column] = []
        return df

    df["candidate_reason"] = df.apply(candidate_reason, axis=1)
    df["candidate_confidence"] = df.apply(candidate_confidence, axis=1)
    df["dep_region"] = df["dep_airport"].apply(airport_region)
    df["arr_region"] = df["arr_airport"].apply(airport_region)
    df["eu_eea_uk_ch_airport_involved"] = (df["dep_region"] == "eu_eea_uk_ch") | (
        df["arr_region"] == "eu_eea_uk_ch"
    )
    scope_rows = df.apply(eu261_scope, axis=1)
    df["likely_eu261_scope"] = [row[0] for row in scope_rows]
    df["eu261_precheck_reason"] = [row[1] for row in scope_rows]
    df["needs_manual_review"] = df.apply(final_needs_manual_review, axis=1)
    df["manual_review_reason"] = df.apply(final_manual_review_reason, axis=1)
    return df


def candidate_reason(row: pd.Series) -> str | None:
    reasons = []
    if row.get("is_cancelled"):
        reasons.append("cancelled")
    if row.get("is_arrival_delay_3h_plus"):
        reasons.append("arrival_delay_3h_plus")
    return "+".join(reasons) if reasons else None


def candidate_confidence(row: pd.Series) -> str | None:
    if not row.get("is_cancelled") and not row.get("is_arrival_delay_3h_plus"):
        return "low" if row.get("needs_manual_review") else None
    if row.get("arrival_data_conflict"):
        return "low"
    if row.get("arrival_match_confidence") == "low":
        return "low"
    if row.get("operating_carrier_confidence") == "low":
        return "low"
    if row.get("is_cancelled"):
        if row.get("raw_has_codeshare") and row.get("operating_carrier_confidence") != "high":
            return "low"
        if (
            row.get("date")
            and row.get("dep_airport")
            and row.get("arr_airport")
            and row.get("dedup_group_id")
            and row.get("operating_carrier_confidence") in {"high", "medium"}
        ):
            return "high" if row.get("operating_carrier_confidence") == "high" else "medium"
        return "medium"
    if row.get("is_arrival_delay_3h_plus"):
        if row.get("arrival_delay_source") == "explicit_api":
            return "high" if row.get("actual_arrival") else "medium"
        if row.get("arrival_delay_source") == "actual_time_delta":
            return "high"
    return "low"


def eu261_scope(row: pd.Series) -> tuple[str, str]:
    dep_region = airport_region(row.get("dep_airport"))
    arr_region = airport_region(row.get("arr_airport"))
    operator = normalized_string(row.get("likely_operating_airline_iata"))
    operator_confidence = row.get("operating_carrier_confidence")
    operator_euish = operator in EU_EEA_UK_CH_AIRLINES

    if dep_region == "unknown" or arr_region == "unknown" or not operator:
        return "manual_review", "insufficient route/operator data"
    if dep_region == "eu_eea_uk_ch":
        return "likely_in_scope", "departure airport is in EU/EEA/UK/CH"
    if arr_region == "eu_eea_uk_ch":
        if operator_confidence == "low":
            return "operator_sensitive", "route arrives in EU/EEA/UK/CH and operating carrier is unclear"
        if operator_euish:
            return "likely_in_scope", "arrival airport is in EU/EEA/UK/CH and likely operator is EU/EEA/UK/CH"
        return "operator_sensitive", "BEG to EU/EEA/UK/CH route where carrier status matters"
    if dep_region == "non_eu" and arr_region == "non_eu":
        return "likely_out_of_scope", "neither airport is in EU/EEA/UK/CH"
    return "manual_review", "conflicting or incomplete route/operator data"


def final_needs_manual_review(row: pd.Series) -> bool:
    if row.get("needs_manual_review"):
        return True
    if row.get("is_cancelled") and row.get("raw_has_codeshare") and row.get("operating_carrier_confidence") != "high":
        return True
    if row.get("operating_carrier_confidence") == "low":
        return True
    if row.get("likely_eu261_scope") in {"manual_review", "operator_sensitive"}:
        return True
    if row.get("arrival_match_confidence") == "low":
        return True
    if row.get("arrival_data_conflict"):
        return True
    return False


def final_manual_review_reason(row: pd.Series) -> str | None:
    reasons = [part for part in str(row.get("manual_review_reason") or "").split("; ") if part]
    if row.get("is_cancelled") and row.get("raw_has_codeshare") and row.get("operating_carrier_confidence") != "high":
        reasons.append("cancellation_only_weak_codeshare_row")
    if row.get("operating_carrier_confidence") == "low":
        reasons.append("unclear_operating_carrier")
    if row.get("likely_eu261_scope") == "manual_review":
        reasons.append("unclear_legal_scope_precheck")
    if row.get("likely_eu261_scope") == "operator_sensitive":
        reasons.append("operator_sensitive_legal_scope")
    if row.get("arrival_match_confidence") == "low":
        reasons.append("data_conflict_or_low_confidence_destination_match")
    if row.get("arrival_data_conflict"):
        reasons.append("data_conflict_or_low_confidence_destination_match")
    deduped = []
    for reason in reasons:
        if reason and reason not in deduped:
            deduped.append(reason)
    return "; ".join(deduped) if deduped else None


def deduped(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df.copy()
    return df[df["is_dedup_primary"]].copy()


def count_true(series: pd.Series) -> int:
    return int(series.fillna(False).astype(bool).sum())


def confirmed_candidates(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df.copy()
    return df[df["is_cancelled"] | df["is_arrival_delay_3h_plus"]].copy()


def manual_review_events(df: pd.DataFrame) -> pd.DataFrame:
    if df.empty:
        return df.copy()
    return df[df["needs_manual_review"]].copy()


def report_columns() -> list[str]:
    return [
        "date",
        "fetch_month",
        "direction",
        "flight_iata",
        "flight_number",
        "route",
        "scheduled_departure",
        "scheduled_arrival",
        "actual_arrival",
        "arrival_delay_minutes",
        "status",
        "is_cancelled",
        "is_arrival_delay_3h_plus",
        "candidate_reason",
        "candidate_confidence",
        "likely_operating_airline_iata",
        "likely_operating_airline_name",
        "marketing_airlines",
        "operating_carrier_confidence",
        "likely_eu261_scope",
        "eu261_precheck_reason",
        "arrival_data_source",
        "arrival_match_confidence",
        "manual_review_reason",
        "dedup_group_id",
    ]


def write_reports(df: pd.DataFrame) -> None:
    primary = deduped(df)
    confirmed = confirmed_candidates(primary)
    manual = manual_review_events(primary)

    write_12m_monthly_summary(df, primary)
    write_12m_monthly_eu261_summary(primary)
    write_seasonality_summary(primary)
    write_breakdown(primary, "route", REPORTS_DIR / "12m_route_breakdown.csv")
    write_breakdown(primary, "likely_operating_airline_iata", REPORTS_DIR / "12m_airline_breakdown.csv")
    write_eu261_summary(primary, REPORTS_DIR / "12m_eu261_precheck_summary.csv")
    write_data_quality_summary(df, primary, REPORTS_DIR / "12m_data_quality_summary.csv")

    confirmed[report_columns()].to_csv(REPORTS_DIR / "12m_confirmed_operational_candidates.csv", index=False)
    manual[report_columns()].to_csv(REPORTS_DIR / "12m_manual_review_events.csv", index=False)
    write_validation_sample(primary)
    write_analysis_summary(df, primary)

    copy_report("12m_monthly_summary.csv", "monthly_summary.csv")
    copy_report("12m_confirmed_operational_candidates.csv", "confirmed_operational_candidates.csv")
    copy_report("12m_manual_review_events.csv", "manual_review_events.csv")
    copy_report("12m_eu261_precheck_summary.csv", "eu261_precheck_summary.csv")
    copy_report("12m_route_breakdown.csv", "route_breakdown.csv")
    copy_report("12m_airline_breakdown.csv", "airline_breakdown.csv")
    copy_report("12m_data_quality_summary.csv", "data_quality_summary.csv")
    write_fetch_issue_reports()


def copy_report(source: str, destination: str) -> None:
    (REPORTS_DIR / destination).write_text((REPORTS_DIR / source).read_text(encoding="utf-8"), encoding="utf-8")


def write_fetch_issue_reports() -> None:
    safe_json_dump(RAW_DIR / "fetch_issues.json", FETCH_ISSUES)
    columns = [
        "stage",
        "airport",
        "direction",
        "date_from",
        "date_to",
        "hard_fail_enabled",
        "error",
        "payload_summary",
    ]
    pd.DataFrame(FETCH_ISSUES, columns=columns).to_csv(REPORTS_DIR / "fetch_issues.csv", index=False)


def write_12m_monthly_summary(raw: pd.DataFrame, primary: pd.DataFrame) -> None:
    rows = []
    for month_label, _, _ in analysis_months():
        raw_month = raw[raw["fetch_month"] == month_label]
        raw_dep = raw_month[raw_month["direction"] == "departure"]
        raw_arr = raw_month[raw_month["direction"] == "arrival"]
        month = primary[primary["fetch_month"] == month_label]
        dep = month[month["direction"] == "departure"]
        arr = month[month["direction"] == "arrival"]
        total = len(month)
        confirmed_total = len(confirmed_candidates(month))
        rows.append(
            {
                "month": month_label,
                "dep_total_raw": len(raw_dep),
                "dep_total_deduped": len(dep),
                "dep_confirmed_candidates": len(confirmed_candidates(dep)),
                "dep_manual_review": len(manual_review_events(dep)),
                "dep_cancelled_confirmed": count_true(dep["is_cancelled"]),
                "dep_3h_plus_confirmed": count_true(dep["is_arrival_delay_3h_plus"]),
                "arr_total_raw": len(raw_arr),
                "arr_total_deduped": len(arr),
                "arr_confirmed_candidates": len(confirmed_candidates(arr)),
                "arr_manual_review": len(manual_review_events(arr)),
                "arr_cancelled_confirmed": count_true(arr["is_cancelled"]),
                "arr_3h_plus_confirmed": count_true(arr["is_arrival_delay_3h_plus"]),
                "total_dedup_flights": total,
                "total_confirmed_operational_candidates": confirmed_total,
                "total_manual_review_events": len(manual_review_events(month)),
                "confirmed_candidate_rate": safe_rate(confirmed_total, total),
            }
        )
    pd.DataFrame(rows).to_csv(REPORTS_DIR / "12m_monthly_summary.csv", index=False)


def write_12m_monthly_eu261_summary(primary: pd.DataFrame) -> None:
    rows = []
    for month_label, _, _ in analysis_months():
        month = primary[primary["fetch_month"] == month_label]
        confirmed = confirmed_candidates(month)
        likely_in_scope = confirmed[confirmed["likely_eu261_scope"] == "likely_in_scope"]
        operator_sensitive = confirmed[confirmed["likely_eu261_scope"] == "operator_sensitive"]
        likely_out = confirmed[confirmed["likely_eu261_scope"] == "likely_out_of_scope"]
        total = len(month)
        rows.append(
            {
                "month": month_label,
                "total_dedup_flights": total,
                "confirmed_operational_candidates": len(confirmed),
                "likely_in_scope_candidates": len(likely_in_scope),
                "operator_sensitive_candidates": len(operator_sensitive),
                "likely_out_of_scope_candidates": len(likely_out),
                "manual_review_events": len(manual_review_events(month)),
                "confirmed_candidate_rate": safe_rate(len(confirmed), total),
                "likely_in_scope_rate": safe_rate(len(likely_in_scope), total),
            }
        )
    pd.DataFrame(rows).to_csv(REPORTS_DIR / "12m_monthly_eu261_precheck_summary.csv", index=False)


def write_seasonality_summary(primary: pd.DataFrame) -> None:
    rows = []
    for month_label, _, _ in analysis_months():
        month = primary[primary["fetch_month"] == month_label]
        confirmed = confirmed_candidates(month)
        likely_in_scope = confirmed[confirmed["likely_eu261_scope"] == "likely_in_scope"]
        total = len(month)
        rows.append(
            {
                "month": month_label,
                "dedup_flights": total,
                "confirmed_candidates": len(confirmed),
                "likely_in_scope_candidates": len(likely_in_scope),
                "operator_sensitive_candidates": len(confirmed[confirmed["likely_eu261_scope"] == "operator_sensitive"]),
                "likely_out_of_scope_candidates": len(confirmed[confirmed["likely_eu261_scope"] == "likely_out_of_scope"]),
                "manual_review_events": len(manual_review_events(month)),
                "candidate_rate": safe_rate(len(confirmed), total),
                "likely_in_scope_rate": safe_rate(len(likely_in_scope), total),
            }
        )
    pd.DataFrame(rows).to_csv(REPORTS_DIR / "12m_seasonality_summary.csv", index=False)


def write_breakdown(primary: pd.DataFrame, column: str, path: Path) -> None:
    confirmed = confirmed_candidates(primary)
    rows = []
    for value, group in primary.groupby(column, dropna=False):
        confirmed_group = confirmed[confirmed[column] == value]
        rows.append(
            {
                column: value or "unknown",
                "dedup_flights": len(group),
                "confirmed_operational_candidates": len(confirmed_group),
                "likely_in_scope_candidates": len(confirmed_group[confirmed_group["likely_eu261_scope"] == "likely_in_scope"]),
                "operator_sensitive_candidates": len(confirmed_group[confirmed_group["likely_eu261_scope"] == "operator_sensitive"]),
                "likely_out_of_scope_candidates": len(confirmed_group[confirmed_group["likely_eu261_scope"] == "likely_out_of_scope"]),
                "manual_review_events": len(manual_review_events(group)),
            }
        )
    output = pd.DataFrame(rows)
    if not output.empty:
        output = output.sort_values("confirmed_operational_candidates", ascending=False)
    output.to_csv(path, index=False)


def write_eu261_summary(primary: pd.DataFrame, path: Path) -> None:
    confirmed = confirmed_candidates(primary)
    rows = []
    for scope, group in confirmed.groupby("likely_eu261_scope", dropna=False):
        rows.append({"likely_eu261_scope": scope or "unknown", "confirmed_operational_candidates": len(group)})
    output = pd.DataFrame(rows)
    if not output.empty:
        output = output.sort_values("confirmed_operational_candidates", ascending=False)
    output.to_csv(path, index=False)


def write_data_quality_summary(raw: pd.DataFrame, primary: pd.DataFrame, path: Path) -> None:
    total_raw = len(raw)
    total_dedup = len(primary)
    confirmed = confirmed_candidates(primary)
    row = {
        "total_raw_rows": total_raw,
        "total_dedup_groups": total_dedup,
        "pct_with_arrival_actual_time": safe_rate(raw["actual_arrival"].notna().sum(), total_raw),
        "pct_with_arrival_delay_minutes": safe_rate(raw["arrival_delay_minutes"].notna().sum(), total_raw),
        "pct_enriched_via_destination_arrival_lookup": safe_rate(
            (raw["arrival_data_source"] == "destination_arrival_lookup").sum(), total_raw
        ),
        "pct_still_missing_final_arrival_data": safe_rate(raw["actual_arrival"].isna().sum(), total_raw),
        "confirmed_candidates": len(confirmed),
        "manual_review_count": len(manual_review_events(primary)),
        "likely_in_scope_count": len(confirmed[confirmed["likely_eu261_scope"] == "likely_in_scope"]),
        "likely_out_of_scope_count": len(confirmed[confirmed["likely_eu261_scope"] == "likely_out_of_scope"]),
        "operator_sensitive_count": len(confirmed[confirmed["likely_eu261_scope"] == "operator_sensitive"]),
        "unknown_status_count": int(primary["status"].isna().sum()),
        "estimated_only_count": int((primary["arrival_delay_source"] == "estimated_time_delta").sum()),
    }
    pd.DataFrame([row]).to_csv(path, index=False)


def write_validation_sample(primary: pd.DataFrame) -> None:
    confirmed = confirmed_candidates(primary).copy()
    columns = [
        "date",
        "flight_iata",
        "route",
        "scheduled_departure",
        "scheduled_arrival",
        "actual_arrival",
        "status",
        "likely_operating_airline_iata",
        "likely_operating_airline_name",
        "marketing_airlines",
        "candidate_reason",
        "candidate_confidence",
        "likely_eu261_scope",
        "eu261_precheck_reason",
        "arrival_data_source",
        "arrival_match_confidence",
        "manual_validation_notes",
    ]
    if confirmed.empty:
        pd.DataFrame(columns=columns).to_csv(REPORTS_DIR / "fr24_validation_sample.csv", index=False)
        return

    confirmed["sample_score"] = confirmed.apply(validation_sample_score, axis=1)
    high_value_cancellations = confirmed[
        confirmed["is_cancelled"] & (confirmed["likely_eu261_scope"] == "likely_in_scope")
    ]
    arrival_delay_candidates = confirmed[confirmed["is_arrival_delay_3h_plus"]]
    suspicious = confirmed[
        confirmed["candidate_confidence"].isin(["medium", "low"])
        | confirmed["operating_carrier_confidence"].isin(["medium", "low"])
        | confirmed["arrival_match_confidence"].isin(["medium", "low"])
        | confirmed["arrival_data_conflict"].fillna(False).astype(bool)
        | (confirmed["marketing_airlines"].fillna("").str.count(";") >= 2)
    ]
    sample = (
        pd.concat([high_value_cancellations, arrival_delay_candidates, suspicious, confirmed])
        .drop_duplicates(subset=["dedup_group_id"])
        .sort_values(["sample_score", "candidate_confidence"], ascending=[False, True])
        .head(30)
        .copy()
    )
    sample["manual_validation_notes"] = ""
    sample[columns].to_csv(REPORTS_DIR / "fr24_validation_sample.csv", index=False)


def validation_sample_score(row: pd.Series) -> int:
    score = 0
    if row.get("likely_eu261_scope") == "likely_in_scope":
        score += 50
    if row.get("is_arrival_delay_3h_plus"):
        score += 40
    if row.get("is_cancelled"):
        score += 30
    if row.get("candidate_confidence") in {"medium", "low"}:
        score += 20
    if len(str(row.get("marketing_airlines") or "").split("; ")) >= 3:
        score += 10
    return score


def write_analysis_summary(raw: pd.DataFrame, primary: pd.DataFrame) -> None:
    confirmed = confirmed_candidates(primary)
    likely_in_scope = confirmed[confirmed["likely_eu261_scope"] == "likely_in_scope"]
    monthly_confirmed = confirmed.groupby("fetch_month").size()
    monthly_scope = likely_in_scope.groupby("fetch_month").size()
    rows = [
        {"section": "totals", "key": "total raw rows", "value": len(raw)},
        {"section": "totals", "key": "total dedup flights", "value": len(primary)},
        {"section": "totals", "key": "confirmed operational candidates", "value": len(confirmed)},
        {"section": "totals", "key": "manual review events", "value": len(manual_review_events(primary))},
        {"section": "totals", "key": "likely EU261-in-scope candidates", "value": len(likely_in_scope)},
        {
            "section": "totals",
            "key": "likely out-of-scope candidates",
            "value": len(confirmed[confirmed["likely_eu261_scope"] == "likely_out_of_scope"]),
        },
        {
            "section": "totals",
            "key": "operator-sensitive candidates",
            "value": len(confirmed[confirmed["likely_eu261_scope"] == "operator_sensitive"]),
        },
        {"section": "totals", "key": "monthly average confirmed candidates", "value": mean_or_zero(monthly_confirmed)},
        {"section": "totals", "key": "monthly average likely in-scope candidates", "value": mean_or_zero(monthly_scope)},
        {"section": "data access", "key": "fetch issues recorded", "value": len(FETCH_ISSUES)},
        {
            "section": "data access",
            "key": "months with fetch issues",
            "value": len({str(issue.get("date_from", ""))[:7] for issue in FETCH_ISSUES if issue.get("date_from")}),
        },
        {
            "section": "warning",
            "key": "legal precheck",
            "value": "This is not final legal eligibility analysis.",
        },
    ]
    for route, count in confirmed["route"].value_counts().head(20).items():
        rows.append({"section": "top candidate routes", "key": route, "value": int(count)})
    for carrier, count in confirmed["likely_operating_airline_iata"].value_counts().head(20).items():
        rows.append({"section": "top candidate likely operating carriers", "key": carrier or "unknown", "value": int(count)})
    pd.DataFrame(rows).to_csv(REPORTS_DIR / "analysis_summary.csv", index=False)


def mean_or_zero(series: pd.Series) -> float:
    if series.empty:
        return 0.0
    value = series.mean()
    if pd.isna(value):
        return 0.0
    return round(float(value), 2)


def safe_rate(numerator: int | float, denominator: int | float) -> float:
    if not denominator:
        return 0.0
    return round(float(numerator) / float(denominator), 6)


def main() -> None:
    load_dotenv()
    ensure_dirs()

    api_key = os.getenv("AVIATION_EDGE_API_KEY")
    if not api_key:
        fail("AVIATION_EDGE_API_KEY is missing. Add it as a GitHub repository secret before running the workflow.")
    strict_fetch = os.getenv("AVIATION_EDGE_STRICT_FETCH") == "1"

    all_records: list[dict[str, Any]] = []
    for month_label, start, end in analysis_months():
        arrivals = fetch_beg_month(api_key, month_label, "arrival", start, end, strict_fetch)
        departures = fetch_beg_month(api_key, month_label, "departure", start, end, strict_fetch)
        departures = enrich_departures_with_destination_arrivals(api_key, month_label, departures)
        all_records.extend(arrivals)
        all_records.extend(departures)

    normalized_rows = [normalize_record(record, index) for index, record in enumerate(all_records, start=1)]
    df = pd.DataFrame(normalized_rows)
    if df.empty:
        df = pd.DataFrame(columns=NORMALIZED_COLUMNS + INTERNAL_COLUMNS)
    df = add_dedup_columns(df)
    df = add_operating_carrier_columns(df)
    df = add_candidate_and_scope_columns(df)

    for column in NORMALIZED_COLUMNS:
        if column not in df.columns:
            df[column] = None

    export_columns = NORMALIZED_COLUMNS + [column for column in INTERNAL_COLUMNS if column in df.columns]
    df[export_columns].to_csv(
        PROCESSED_DIR / "beg_flights_normalized.csv",
        index=False,
    )
    write_reports(df)

    primary = deduped(df)
    confirmed = confirmed_candidates(primary)
    likely_in_scope = confirmed[confirmed["likely_eu261_scope"] == "likely_in_scope"]
    print(f"Finished. Raw rows: {len(df)}. Deduped flights: {len(primary)}.")
    print(f"Confirmed operational candidates: {len(confirmed)}.")
    print(f"Likely EU261-in-scope candidates: {len(likely_in_scope)}.")
    print(f"Reports directory: {REPORTS_DIR.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
