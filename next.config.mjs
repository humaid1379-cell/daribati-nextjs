/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Treat Auth0 SDK as a server-side external package to avoid Edge Runtime bundling issues
  serverExternalPackages: ["@auth0/nextjs-auth0"],

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://plausible.io https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com",
              "connect-src 'self' https: https://dev-4arqc0dzmbim7yn5.us.auth0.com",
              "frame-src 'self' https://challenges.cloudflare.com https://dev-4arqc0dzmbim7yn5.us.auth0.com",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: false,
      },
      {
        source: "/logout",
        destination: "/auth/logout",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
