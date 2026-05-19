import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // HTTP → HTTPS redirect
  if (request.headers.get("x-forwarded-proto") === "http") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // www → non-www redirect
  if (hostname.startsWith("www.")) {
    url.host = hostname.replace("www.", "");
    return NextResponse.redirect(url, 301);
  }

  // Delegate Auth0 authentication routes and session management to the SDK
  const response = await auth0.middleware(request);

  // Add security headers to every response
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  
  // Add CSP and Permissions-Policy to dynamic pages
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://plausible.io https://static.cloudflareinsights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com",
    "connect-src 'self' https: https://dev-4arqc0dzmbim7yn5.eu.auth0.com https://*.sentry.io",
    "frame-src 'self' https://challenges.cloudflare.com https://dev-4arqc0dzmbim7yn5.eu.auth0.com",
    "object-src 'none'",
    "base-uri 'self'",
  ].join("; ");
  response.headers.set("Content-Security-Policy", csp);
  
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()"
  );
  
  response.headers.delete("X-Powered-By");

  // Add Cache-Control headers for HTML pages to optimize TTFB
  // Allow Cloudflare edge to cache HTML responses for 60s, browsers revalidate
  const pathname = request.nextUrl.pathname;
  const isAuthRoute = pathname.startsWith("/auth/") || pathname.startsWith("/api/");
  const isDashboard = pathname.startsWith("/dashboard");

  if (!isAuthRoute && !isDashboard) {
    // Public pages: cache at edge for 60s, stale-while-revalidate for 300s
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );
    // CDN-Cache-Control for Cloudflare specifically
    response.headers.set(
      "CDN-Cache-Control",
      "public, max-age=60, stale-while-revalidate=300"
    );
  } else {
    // Auth/dashboard pages: no caching
    response.headers.set(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder static assets
     */
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
