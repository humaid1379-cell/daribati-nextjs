# Worker Route Fix - May 2026

## Problem
The custom domain `daribati.ae` was serving stale content from an old Vite SPA build
instead of the latest Next.js SSR deployment from Cloudflare Pages.

## Root Cause
A Cloudflare Worker named `daribati-proxy` had routes configured for:
- `daribati.ae/*`
- `www.daribati.ae/*`

This worker was intercepting ALL traffic and proxying it to an old origin
(`daritax-fhffuwsz.manus.space`) which served an outdated Vite SPA bundle.

The worker also contained `JS_PRICING_REPLACEMENTS` that introduced a typo:
- "المثدئ" (incorrect) instead of "المبتدئ" (correct)

## Solution
1. Deleted worker routes for `daribati.ae/*` and `www.daribati.ae/*`
2. Purged Cloudflare cache
3. Traffic now flows directly to Cloudflare Pages deployment

## Verification
After fix, `daribati.ae` correctly serves:
- Title: `ضريبتي — Daribati | منصة الضرائب والفوترة في الإمارات`
- Next.js SSR content with `/_next/static/` paths
- No more Vite `/assets/index-*.js` paths
