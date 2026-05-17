# Security Headers Audit Report

**Target URL**: `https://daribati-nextjs.pages.dev`
**Date**: May 17, 2026

An audit of the live site was conducted using `curl -sI` to verify the presence of 7 critical security headers.

## Results

| Security Header | Status | Value Found |
| --- | --- | --- |
| **Strict-Transport-Security** | ✅ Present | `max-age=31536000; includeSubDomains` |
| **X-Frame-Options** | ✅ Present | `DENY` |
| **X-Content-Type-Options** | ✅ Present | `nosniff` |
| **X-XSS-Protection** | ✅ Present | `1; mode=block` |
| **Referrer-Policy** | ✅ Present | `strict-origin-when-cross-origin` |
| **Content-Security-Policy** | ✅ Present | `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://plausible.io https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com; connect-src 'self' https: https://dev-4arqc0dzmbim7yn5.eu.auth0.com https://*.sentry.io; frame-src 'self' https://challenges.cloudflare.com https://dev-4arqc0dzmbim7yn5.eu.auth0.com; object-src 'none'; base-uri 'self'` |
| **Permissions-Policy** | ✅ Present | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()` |

## Conclusion
All 7 required security headers are successfully implemented and active on the live site. The configuration in `next.config.mjs` and `middleware.ts` is functioning correctly in the Cloudflare Pages environment.
