import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

// Use Node.js runtime for middleware so Auth0 SDK can access Node.js APIs
export const runtime = "nodejs";

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
  response.headers.delete("X-Powered-By");

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
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
