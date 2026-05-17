import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: "production",
  release: process.env.npm_package_version,
  tracesSampleRate: 0.1,
  debug: false,
});
