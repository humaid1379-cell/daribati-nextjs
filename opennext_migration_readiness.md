# OpenNext Migration Readiness Assessment

This document assesses the readiness of the `daribati-nextjs` project to migrate from `@cloudflare/next-on-pages` to `@opennextjs/cloudflare`.

## Current State Analysis

Based on the repository scan:
1. **Dependencies**: The project currently uses standard Next.js (`14.2.35`). It does **not** have `@cloudflare/next-on-pages` installed in `package.json`.
2. **Configuration**: `next.config.mjs` does not contain any Cloudflare-specific `setupDevPlatform()` calls.
3. **Edge Runtime**: All `page.tsx`, `route.ts`, `layout.tsx`, `error.tsx`, `loading.tsx`, and `middleware.ts` files have been updated to include `export const runtime = 'edge';`.

## Migration Steps Required

To fully adopt OpenNext for Cloudflare, the following steps must be taken:

1. **Remove Edge Runtime Exports**:
   - OpenNext currently does **not** support the edge runtime.
   - **Action**: Remove `export const runtime = 'edge';` from all files where it was just added.

2. **Install Dependencies**:
   - Run: `npm install @opennextjs/cloudflare@latest`
   - Run: `npm install --save-dev wrangler@latest` (requires version 3.99.0+)

3. **Update Configuration Files**:
   - Create `wrangler.jsonc` with the `nodejs_compat` compatibility flag and compatibility date `2024-09-23` or later.
   - Create `open-next.config.ts` in the root directory.
   - Add `.dev.vars` for local environment variables.

4. **Update package.json Scripts**:
   - Modify the `preview`, `deploy`, and `upload` scripts to use `opennextjs-cloudflare`.

5. **Local Development**:
   - Update `next.config.mjs` to import and call `initOpenNextCloudflareForDev()` to enable local Cloudflare bindings.

## Conclusion
The project is currently configured for standard Next.js deployment. To migrate to OpenNext, the primary blocker is the `runtime = 'edge'` exports, which must be removed, followed by the installation and configuration of the `@opennextjs/cloudflare` adapter.
