const hits = new Map<string, number[]>();

function prune(windowStart: number, timestamps: number[]) {
  return timestamps.filter((timestamp) => timestamp >= windowStart);
}

export function isRateLimited(
  key: string,
  options?: {
    windowMs?: number;
    maxHits?: number;
  },
) {
  const windowMs = options?.windowMs ?? 60_000;
  const maxHits = options?.maxHits ?? 5;
  const now = Date.now();
  const windowStart = now - windowMs;
  const existing = prune(windowStart, hits.get(key) ?? []);

  if (existing.length >= maxHits) {
    hits.set(key, existing);
    return true;
  }

  existing.push(now);
  hits.set(key, existing);
  return false;
}
