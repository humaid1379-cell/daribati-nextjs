# Daribati.ae Automation & Infrastructure Improvements

This document outlines the automation and infrastructure improvements implemented for the `daribati-nextjs` repository.

## 1. CI/CD Pipeline Fix

The workflow files have been prepared and moved from `workflows-ready/` to `.github/workflows/`. 

**Important Note on GitHub Token Scopes:**
The provided GitHub Personal Access Token (`<YOUR_GITHUB_TOKEN>`) has `repo` scope but lacks the `workflow` scope. GitHub strictly requires the `workflow` scope to create or modify files inside the `.github/workflows/` directory, even when using the API.

**Action Required:**
To push the workflow files, you must use a token with `workflow` scope. I have created a helper script to make this easy:

```bash
# 1. Create a new token at https://github.com/settings/tokens/new with 'repo' and 'workflow' scopes
# 2. Run the helper script:
export GITHUB_TOKEN="ghp_your_new_token"
bash scripts/push-workflows.sh
```

## 2. Arabic Spell Check

I have implemented a comprehensive Arabic spell check system to catch typos before deployment.

- **Dictionary Generation**: Extracted all 937 unique Arabic words currently used in the codebase and created an approved dictionary at `scripts/arabic-dictionary.json`.
- **Spell Check Script**: Created `scripts/arabic-spellcheck.py` which scans all `.ts`, `.tsx`, `.md`, and `.json` files for Arabic text and compares it against the dictionary.
- **CI Integration**: Added an `arabic-spellcheck` job to the CI/CD pipeline that runs before the build step. It will fail the build if unknown Arabic words are found.

**How to use:**
When adding new Arabic content, if the CI fails, you can update the dictionary locally:
```bash
python3 scripts/arabic-spellcheck.py --update-dict
```

## 3. Cloudflare Bot Fight Mode Fix

The 403 errors on `daribati.ae` are likely caused by Cloudflare's Bot Fight Mode blocking legitimate traffic. I have created a comprehensive management script at `scripts/cloudflare-bot-management.sh`.

**Action Required:**
Run the script with your Cloudflare API token to configure the WAF rules properly:

```bash
export CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
bash scripts/cloudflare-bot-management.sh full
```

This script will:
1. Disable the aggressive Bot Fight Mode
2. Create custom WAF rules to allow verified bots (Googlebot, etc.)
3. Allow legitimate browsers from UAE/GCC countries
4. Challenge suspicious automated traffic
5. Set up rate limiting for API endpoints

## 4. Sentry Error Monitoring

Sentry has been fully integrated into the Next.js project for error tracking across all runtimes.

- **Instrumentation**: Created `instrumentation.ts` to hook into Next.js server and edge runtimes.
- **Configuration**: Updated `next.config.mjs` with the Sentry webpack plugin.
- **Documentation**: Created `docs/sentry-setup.md` with detailed instructions.

**Action Required:**
Add the following secrets to your Cloudflare Pages environment and GitHub repository:
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN` (for source map uploads in CI)

## 5. Lighthouse CI

Added automated performance, accessibility, and SEO auditing via Lighthouse CI.

- **Configuration**: Created `lighthouserc.json` with strict thresholds (e.g., Accessibility > 90%, SEO > 90%).
- **Workflow**: Created `.github/workflows/lighthouse-ci.yml` which runs on every PR and push to main.
- **Reporting**: The workflow automatically posts a summary comment on PRs with the Lighthouse scores.

## 6. Cloudflare Cache Purge

Added automated cache purging to the CI/CD pipeline.

- **CI Integration**: Added a `Purge Cloudflare Cache` step to the `build-and-deploy` job in `ci-cd.yml`. It runs automatically after a successful deployment.
- **Manual Script**: Created `scripts/purge-cloudflare-cache.sh` for manual cache purging when needed.

**Action Required:**
Ensure the following secrets are set in your GitHub repository:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID` (optional, the script will try to auto-detect it)

## Summary of Pushed Files

All scripts, configurations, and documentation have been successfully pushed to the `main` branch:
- `scripts/arabic-dictionary.json`
- `scripts/arabic-spellcheck.py`
- `scripts/cloudflare-bot-management.sh`
- `scripts/purge-cloudflare-cache.sh`
- `scripts/push-workflows.sh`
- `instrumentation.ts`
- `lighthouserc.json`
- `docs/sentry-setup.md`

The only remaining step is to push the workflow files using a token with the correct scopes.
