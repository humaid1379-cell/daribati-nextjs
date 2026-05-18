# Sentry Error Monitoring Setup

## Overview

Sentry is integrated into the daribati.ae Next.js project for comprehensive error tracking across client, server, and edge runtimes.

## Configuration Files

| File | Purpose |
|------|---------|
| `sentry.client.config.ts` | Client-side (browser) error tracking |
| `sentry.server.config.ts` | Server-side (Node.js) error tracking |
| `sentry.edge.config.ts` | Edge runtime error tracking |
| `instrumentation.ts` | Next.js instrumentation hook for Sentry |
| `next.config.mjs` | Sentry webpack plugin configuration |
| `src/app/global-error.tsx` | Global error boundary with Sentry reporting |

## Required Environment Variables

Set these in your Cloudflare Pages environment or `.env.local`:

```bash
# Public DSN (safe to expose in client bundles)
NEXT_PUBLIC_SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/1234567

# Server-side DSN (same value, used in server/edge contexts)
SENTRY_DSN=https://your-key@o123456.ingest.sentry.io/1234567

# Auth token for source map uploads (CI/CD only)
SENTRY_AUTH_TOKEN=sntrys_your-auth-token

# Organization and project slugs
SENTRY_ORG=daribati
SENTRY_PROJECT=daribati-nextjs
```

## Setup Steps

### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io) and sign in
2. Create a new project: **Next.js** platform
3. Organization slug: `daribati`
4. Project name: `daribati-nextjs`
5. Copy the DSN from the project settings

### 2. Set Environment Variables

**For Cloudflare Pages:**
```bash
# In Cloudflare Dashboard > Pages > daribati-nextjs > Settings > Environment Variables
NEXT_PUBLIC_SENTRY_DSN=<your-dsn>
SENTRY_DSN=<your-dsn>
SENTRY_AUTH_TOKEN=<your-auth-token>
```

**For GitHub Actions (source map uploads):**
```bash
# In GitHub > Settings > Secrets > Actions
SENTRY_AUTH_TOKEN=<your-auth-token>
```

### 3. Generate Auth Token

1. Go to [sentry.io/settings/auth-tokens/](https://sentry.io/settings/auth-tokens/)
2. Create a new token with scopes:
   - `project:releases`
   - `org:read`
3. Add as `SENTRY_AUTH_TOKEN` secret in GitHub and Cloudflare

### 4. Verify Integration

After deployment, verify Sentry is working:

```javascript
// In browser console on your deployed site:
throw new Error("Sentry test error");
```

Check the Sentry dashboard for the error within 1-2 minutes.

## Features Enabled

- **Performance Monitoring**: 10% trace sample rate (`tracesSampleRate: 0.1`)
- **Source Maps**: Uploaded during CI/CD build (hidden from public)
- **Tunnel Route**: `/monitoring` - bypasses ad blockers
- **React Component Annotations**: Automatic component name tracking
- **Global Error Boundary**: Catches and reports unhandled errors
- **Request Error Tracking**: Server-side request errors via instrumentation

## Monitoring Dashboard

Access your Sentry dashboard at:
`https://daribati.sentry.io/`

### Key Alerts to Configure

1. **High Error Rate**: Alert when error count exceeds 10/hour
2. **New Issue**: Alert on first occurrence of new error types
3. **Performance Regression**: Alert when p95 response time increases >50%
