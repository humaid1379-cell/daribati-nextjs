# Daribati (ضريبتي) — Next.js SSR Application

UAE Tax + Billing SaaS platform for businesses, SMEs, and free zone companies. This Next.js application replaces the previous Cloudflare Worker proxy approach with a proper SSR application that handles all security, SEO, accessibility, and business logic natively.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: IBM Plex Sans Arabic (Google Fonts)
- **Deployment**: Vercel / Cloudflare Pages

## Features

- **SSR** for all pages (/, /pricing, /calculator, /compliance)
- **Arabic-first** (lang="ar", dir="rtl")
- **Security headers** (CSP, HSTS, X-Frame-Options, etc.) via next.config.mjs
- **HTTPS redirect** and www→non-www via middleware
- **SEO**: meta tags, JSON-LD structured data, canonical URLs, sitemap.xml, robots.txt
- **Accessibility**: skip navigation, ARIA labels, 44px touch targets, semantic HTML
- **Error tracking**: error boundary + API route for client error reporting
- **Pricing plans** built directly into the app (Starter 99, Business 299, Enterprise 799 AED)
- **Tax calculator** with VAT and Corporate Tax calculations

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (RTL, fonts, JSON-LD)
│   ├── page.tsx            # Homepage
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404 page
│   ├── loading.tsx         # Loading state
│   ├── global-error.tsx    # Global error handler
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Dynamic robots.txt generation
│   ├── pricing/page.tsx    # Pricing page
│   ├── calculator/page.tsx # Tax calculator page
│   ├── compliance/page.tsx # Compliance guide page
│   └── api/
│       ├── health/route.ts # Health check endpoint
│       └── errors/route.ts # Error tracking endpoint
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   └── TaxCalculator.tsx   # Interactive tax calculator
├── lib/
│   ├── constants.ts        # Site configuration & pricing plans
│   ├── metadata.ts         # SEO metadata helpers
│   ├── jsonld.ts           # JSON-LD structured data
│   └── error-tracker.ts    # Error tracking utility
└── middleware.ts            # HTTPS redirect & security headers
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables if needed
4. Deploy

### Cloudflare Pages

1. Push to GitHub
2. Create a new Cloudflare Pages project
3. Set build command: `pnpm build`
4. Set output directory: `.next`
5. Use the `@cloudflare/next-on-pages` adapter

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ERROR_API_KEY` | API key for error tracking endpoint | `daribati-error-key-2024` |

## DNS Configuration

After deployment, update DNS records for daribati.ae:

- Remove the Cloudflare Worker route
- Point the domain to Vercel/Cloudflare Pages
- The Worker proxy is no longer needed

## License

Proprietary — Daribati
