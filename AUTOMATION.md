# Daribati.ae Automation Tools

This document outlines the 10 automation tools and solutions implemented for the daribati.ae project. These tools ensure code quality, deployment reliability, security, and performance.

## 1. Cloudflare Pages Deployment Validator
**Type:** GitHub Actions Workflow (`.github/workflows/deployment-validator.yml`)
**Trigger:** Runs automatically after the CI/CD Pipeline completes successfully.
**Purpose:** Validates that the content served on the custom domain (`daribati.ae`) matches the content on the Cloudflare Pages deployment URL (`daribati-nextjs.pages.dev`).
**Features:**
- Compares page titles, content hashes, and script bundle paths.
- Creates a GitHub issue if a mismatch is detected, which could indicate caching issues or stale Worker routes.

## 2. Arabic Content Linter
**Type:** GitHub Actions Workflow (`.github/workflows/arabic-linter.yml`) & Python Script (`scripts/arabic-linter.py`)
**Trigger:** Runs on push/PR to `main` when `.ts` or `.tsx` files are modified.
**Purpose:** Ensures high-quality Arabic content by checking for common typos and misspellings.
**Features:**
- Uses a dictionary of known misspellings (`scripts/arabic-dictionary.json`).
- Fails the build if typos are found and annotates the PR with the exact location.
- Can be run locally with `--fix` to automatically correct typos.

## 3. Cloudflare WAF Manager
**Type:** Shell Script (`scripts/waf-manager.sh`)
**Trigger:** Manual execution or via CI/CD for E2E testing.
**Purpose:** Manages Cloudflare Web Application Firewall (WAF) rules and Bot Fight Mode.
**Features:**
- Can temporarily disable geo-challenge rules and Bot Fight Mode for automated testing (`testing-mode`).
- Can re-enable all protections for production (`production-mode`).
- Checks current WAF status.

## 4. Build Cache Buster
**Type:** GitHub Actions Workflow (`.github/workflows/cache-buster.yml`) & Shell Script (`scripts/purge-cache.sh`)
**Trigger:** Runs automatically after the CI/CD Pipeline completes successfully.
**Purpose:** Ensures users receive the latest version of the site immediately after deployment.
**Features:**
- Checks if the live site content matches the expected build hash.
- If a mismatch is detected, it purges the Cloudflare cache.
- Retries up to 3 times and creates an issue if the mismatch persists.

## 5. DNS Health Monitor
**Type:** GitHub Actions Workflow (`.github/workflows/dns-health-monitor.yml`) & Shell Script (`scripts/dns-health-check.sh`)
**Trigger:** Runs daily on a schedule (cron) and can be triggered manually.
**Purpose:** Monitors the health of DNS records, SSL certificates, and Cloudflare routing.
**Features:**
- Verifies DNS resolution for apex and `www` domains.
- Checks SSL certificate validity and alerts if expiring within 14 days.
- Ensures the CNAME points to the correct `pages.dev` target.

## 6. Environment Variables Auditor
**Type:** GitHub Actions Workflow (`.github/workflows/env-auditor.yml`) & Shell Script (`scripts/env-auditor.sh`)
**Trigger:** Runs on push/PR to `main` as a pre-deploy check.
**Purpose:** Prevents deployments that would fail at runtime due to missing configuration.
**Features:**
- Checks Cloudflare Pages project settings via API to ensure all required environment variables (e.g., Auth0 credentials) are present.
- Fails the build early if variables are missing.

## 7. Performance Budget Enforcer
**Type:** GitHub Actions Workflow (`.github/workflows/performance-budget.yml`)
**Trigger:** Runs on push to `main`.
**Purpose:** Ensures the site maintains high performance, accessibility, and SEO standards.
**Features:**
- Uses Lighthouse CI to audit the build against predefined budgets (Performance > 80, Accessibility > 90, SEO > 90, Best Practices > 80).
- Includes Arabic-specific checks (RTL layout, Arabic font loading, proper `lang="ar"` attribute).

## 8. Security Headers Validator
**Type:** GitHub Actions Workflow (`.github/workflows/security-headers.yml`) & Shell Script (`scripts/security-headers-check.sh`)
**Trigger:** Runs after deployment and weekly on a schedule.
**Purpose:** Validates that the live site serves appropriate security headers.
**Features:**
- Checks for CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
- Creates a GitHub issue if critical headers are missing.

## 9. Custom Domain Sync Checker
**Type:** GitHub Actions Workflow (`.github/workflows/domain-sync-checker.yml`) & Shell Script (`scripts/verify-domain-sync.sh`)
**Trigger:** Runs automatically after the CI/CD Pipeline completes successfully.
**Purpose:** Verifies that the custom domain is perfectly synced with the underlying Pages deployment.
**Features:**
- Compares JS bundle hashes between domains.
- Checks for conflicting Cloudflare Worker routes that might intercept traffic.
- Verifies no stale proxy workers are active.

## 10. Automated Rollback System
**Type:** GitHub Actions Workflow (`.github/workflows/automated-rollback.yml`) & Shell Script (`scripts/rollback.sh`)
**Trigger:** Runs automatically after the CI/CD Pipeline completes successfully.
**Purpose:** Provides a safety net by automatically reverting to a known good state if a deployment is broken.
**Features:**
- Runs post-deploy health checks (HTTP status, page title, Next.js markers, response time).
- If checks fail, automatically rolls back to the previous successful deployment using the Cloudflare Pages API.
- Creates an urgent GitHub issue detailing the failure and rollback status.

---

### Setup Requirements

To ensure all tools function correctly, the following secrets must be configured in the GitHub repository:

- `CLOUDFLARE_API_TOKEN`: A Cloudflare API token with permissions to read/edit Pages projects, Workers, DNS, and Cache.
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.
- `CLOUDFLARE_ZONE_ID`: The Zone ID for `daribati.ae`.
