/**
 * IP-Based Rate Limiting
 * Phase 1.2 — Daribati Contact Form
 *
 * In-memory rate limiting for Edge Runtime.
 * Limits: 3 requests per IP per hour.
 *
 * Note: In-memory store resets on cold starts.
 * For production at scale, consider Cloudflare KV or D1.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 3600000; // 1 hour

/**
 * Check if a request from the given IP is within rate limits.
 * Returns true if allowed, false if rate limited.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  // No existing entry or window expired — allow and reset
  if (!entry || now > entry.resetTime) {
    store.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }

  // Within window — check count
  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  // Increment and allow
  entry.count++;
  return true;
}

/**
 * Get remaining requests for an IP.
 */
export function getRemainingRequests(ip: string): number {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetTime) {
    return MAX_REQUESTS;
  }

  return Math.max(0, MAX_REQUESTS - entry.count);
}

/**
 * Reset rate limit for an IP (for testing).
 */
export function resetRateLimit(ip: string): void {
  store.delete(ip);
}

/**
 * Clear all rate limit entries (for testing).
 */
export function clearAllRateLimits(): void {
  store.clear();
}
