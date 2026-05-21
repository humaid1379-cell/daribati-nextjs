# OpenNext Migration Plan for Daribati Platform

## 1. Overview
This document outlines the steps required to migrate the Daribati Next.js 14 application from the Vercel Edge Runtime to Cloudflare Pages using OpenNext (`@opennextjs/cloudflare`). This migration is necessary to resolve compatibility issues with certain Node.js APIs and to optimize deployment on Cloudflare's infrastructure.

## 2. Preparation Steps

### 2.1. Remove Edge Runtime Directives
The `runtime = 'edge'` directive must be removed from all files in the project. The following files have been identified as containing this directive:
- `src/app/calculator/page.tsx`
- `src/app/api/health/route.ts`
- `src/app/api/errors/route.ts`
- `src/app/dashboard/page.tsx`
- `src/app/page.tsx`
- `src/app/sitemap.ts`
- `src/app/not-found.tsx`
- `src/app/global-error.tsx`
- `src/app/layout.tsx`
- `src/app/loading.tsx`
- `src/app/pricing/page.tsx`
- `src/app/error.tsx`
- `src/app/robots.ts`
- `src/app/compliance/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`

### 2.2. Install Dependencies
Install the required OpenNext Cloudflare adapter:
```bash
npm install --save-dev @opennextjs/cloudflare
```

## 3. Configuration Changes

### 3.1. Update `next.config.mjs`
Ensure that the Next.js configuration is compatible with OpenNext. Remove any Edge-specific workarounds if they are no longer needed.

### 3.2. Update `wrangler.toml`
Modify the `wrangler.toml` file to point to the OpenNext output directory instead of the Vercel output directory.
```toml
name = "daribati-nextjs"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".open-next/worker"
```

### 3.3. Add OpenNext Configuration
Create an `opennext.config.ts` file in the root directory if specific OpenNext configurations are required for the project.

### 3.4. Update Build Scripts
Update the `package.json` scripts to use the OpenNext build process:
```json
"scripts": {
  "build": "next build && npx @opennextjs/cloudflare"
}
```

## 4. Testing Plan

### 4.1. Local Testing
1. Run the local development server using `npm run dev` to ensure no regressions.
2. Build the project locally using `npm run build`.
3. Test the built worker locally using Wrangler: `npx wrangler pages dev .open-next/worker`.

### 4.2. Staging Deployment
1. Deploy the changes to a staging environment on Cloudflare Pages.
2. Verify all API routes, especially those that previously used the Edge runtime.
3. Test authentication flows (Auth0) to ensure they function correctly in the new environment.
4. Perform a full regression test of the application's core features.

## 5. Rollback Plan
If the migration causes critical issues in production:
1. Revert the commit containing the OpenNext migration changes.
2. Restore the `runtime = 'edge'` directives in all affected files.
3. Revert `wrangler.toml` to point back to `.vercel/output/static`.
4. Trigger a new deployment to restore the previous stable state.
