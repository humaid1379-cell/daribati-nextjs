# Daribati Content Audit — Findings

## 1. Arabic Text Quality

| # | Page | Issue | Details |
|---|------|-------|---------|
| 1 | Privacy | Inconsistent brand name | Uses "ضريباتي" (with extra ا) in legal entity name vs "ضريبتي" everywhere else. The legal entity name is correct as registered, but the body text must consistently use "ضريبتي" for the product name. |
| 2 | Homepage | CTA mismatch | "ابدأ الآن مجاناً" (Start now for free) links to /pricing — but there's no free plan. Should say "ابدأ الآن" or link to signup. |
| 3 | Pricing | Period display | Shows "/ شهرياً" which reads oddly. Should be just "شهرياً" without the slash, or use "/ شهر". |
| 4 | Compliance | Grammar | "ابقَ متوافقاً" — acceptable but "ابقَ ملتزماً" is more natural in tax context. Minor. |

## 2. English Text Quality

| # | Page | Issue | Details |
|---|------|-------|---------|
| 1 | Privacy/Terms | Entity name | "Daribati IT Consulting" — acceptable English translation. No issues. |
| 2 | Constants | Description | SITE_DESCRIPTION uses "Arabic-first dashboard" — correct. |

## 3. Information Accuracy

| # | Page | Issue | Severity |
|---|------|-------|----------|
| 1 | Homepage | "+1000 شركة تثق بنا" — unverifiable marketing claim for a new platform | Medium |
| 2 | Homepage | "+50K فاتورة شهرياً" — unverifiable claim | Medium |
| 3 | Homepage | "24/7 دعم فني" — no support infrastructure visible in codebase | Medium |
| 4 | Homepage CTA | "ابدأ الآن مجاناً" implies free plan, but cheapest is 99 AED. Should reference the 14-day trial instead. | High |
| 5 | Pricing FAQ | "فترة تجريبية مجانية لمدة 14 يوماً" — not implemented in code but acceptable as planned feature | Low |
| 6 | Pricing FAQ | "Apple Pay" listed as payment method — no payment integration exists in codebase | Medium |
| 7 | Dashboard | Quick actions all link to "#" — non-functional placeholder links | High |

## 4. Links

| # | Page | Issue | Status |
|---|------|-------|--------|
| 1 | Dashboard | Quick action hrefs are all "#" | Broken |
| 2 | Footer | Social links (x.com/daribati_ae, linkedin, instagram) — may not exist yet | Unverifiable |
| 3 | All pages | Internal links (/pricing, /calculator, /compliance, /privacy, /terms) | Working |
| 4 | Pricing | Enterprise "تواصل معنا" → mailto:admin@daribati.ae | Working |

## 5. CTAs (Call to Action)

| # | Page | Issue | Fix |
|---|------|-------|-----|
| 1 | Homepage hero | "ابدأ الآن مجاناً" misleading — no free plan | Change to "ابدأ الآن" or "ابدأ تجربتك المجانية" |
| 2 | Dashboard | 4 quick-action buttons link to "#" | Change to descriptive disabled state or remove |
| 3 | Pricing | "ابدأ الآن" for Starter/Business → /dashboard/ (trailing slash inconsistency) | Remove trailing slash |

## 6. Legal Pages

| # | Page | Issue | Severity |
|---|------|-------|----------|
| 1 | Privacy | No specific UAE data protection law reference (PDPL/Federal Decree-Law No. 45 of 2021) | Medium |
| 2 | Privacy | No DPO or specific contact person mentioned | Low |
| 3 | Privacy | Claims "مراكز بيانات معتمدة في الإمارات" but uses Cloudflare Pages (global CDN) | Medium |
| 4 | Terms | No specific emirate for court jurisdiction | Low |
| 5 | Terms | Missing clause about force majeure | Low |
| 6 | Both | Company address is just "الإمارات العربية المتحدة" — should include emirate/city | Medium |

## 7. SEO

| # | Page | Issue | Fix |
|---|------|-------|-----|
| 1 | Homepage | Has both page-level metadata title AND h1 in content — good | OK |
| 2 | Pricing | Visible H1 is sr-only, main visible heading is H2 — semantically odd | Make visible H2 an H1 or remove sr-only H1 |
| 3 | Dashboard | Has canonical URL but page is disallowed in robots.txt — conflicting signals | Remove canonical from dashboard |
| 4 | All pages | OG images reference /og-image.png — need to verify it exists | Check public/ |
| 5 | Homepage | Metadata title duplicates site title pattern | Minor |

## 8. Accessibility

| # | Page | Issue | Fix |
|---|------|-------|-----|
| 1 | Dashboard | Uses raw `<img>` with eslint-disable instead of Next.js Image — has alt text though | Low priority |
| 2 | All pages | SVG icons have aria-hidden="true" — correct | OK |
| 3 | Header | Mobile menu button has aria-label and aria-expanded — correct | OK |
| 4 | Footer | Social links have aria-labels — correct | OK |
| 5 | Calculator | Tax type buttons use aria-pressed — correct | OK |
| 6 | Cookie notice | Has role="dialog" and aria-label — correct | OK |
| 7 | Skip link | Present and functional | OK |
| 8 | Pricing | Checkmark SVGs lack accessible text for feature items | Low — parent text provides context |

## 9. Consistency

| # | Issue | Details |
|---|-------|---------|
| 1 | "حاسبة الضرائب" vs "الحاسبة" | Nav uses "الحاسبة", page title uses "حاسبة الضرائب" — acceptable |
| 2 | Trailing slash | /dashboard/ in pricing links vs /dashboard elsewhere | Fix: remove trailing slash |
| 3 | "FTA" vs "الهيئة الاتحادية للضرائب" | Mixed usage — should prefer full Arabic with English abbreviation in parentheses on first use | Minor |
| 4 | Brand color | Consistently uses BRAND_COLOR constant — good |
| 5 | Footer description vs homepage description | Slightly different wording — acceptable |

## 10. Missing Content

| # | What's Missing | Priority |
|---|----------------|----------|
| 1 | No "About Us" / "من نحن" page | Medium |
| 2 | No contact page with form | Medium |
| 3 | No blog/resources section | Low |
| 4 | No FAQ page (only FAQ section in pricing) | Low |
| 5 | Privacy policy missing reference to UAE PDPL (Federal Decree-Law No. 45/2021) | Medium |
| 6 | No cookie preference management (only accept button, no reject/customize) | Medium |
| 7 | Terms missing dispute resolution mechanism (mediation before court) | Low |
| 8 | No accessibility statement page | Low |

---

## Summary of Fixes to Implement

### High Priority
1. Fix "ابدأ الآن مجاناً" CTA — change to reference free trial
2. Fix dashboard quick-action placeholder links
3. Remove trailing slash from /dashboard/ link in pricing
4. Add UAE PDPL reference to privacy policy
5. Fix pricing period display ("/ شهرياً")
6. Remove/qualify unverifiable stats claims
7. Fix Apple Pay claim in FAQ (or qualify as "coming soon")
8. Remove dashboard canonical URL (conflicts with robots.txt noindex)
9. Fix pricing page heading hierarchy (sr-only H1 issue)

### Medium Priority
10. Add emirate to legal contact address
11. Qualify "مراكز بيانات" claim
12. Add cookie reject option
13. Improve CTA consistency across pages
