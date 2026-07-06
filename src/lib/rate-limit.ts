import "server-only";

// Lightweight in-memory fixed-window rate limiter. Good enough for a
// single-instance small deployment; if this app is ever deployed across
// multiple server instances, swap this for a shared store (e.g. Redis)
// since counts here are per-process.
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

// `x-forwarded-for` is only trustworthy if this app is deployed behind a
// reverse proxy/platform (Vercel, nginx, etc.) that sets it itself and
// strips any client-supplied value first — otherwise a client can forge it
// to cycle through fake IPs and dodge the per-IP limits below. That's why
// every call site pairs this with a non-spoofable key (email, user id) as
// the primary control, using IP only as a secondary layer.
export function clientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}
