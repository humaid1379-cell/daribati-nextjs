export const runtime = 'edge';

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { SITE_TITLE, SITE_DESCRIPTION_AR, SITE_URL, BRAND_COLOR } from "@/lib/constants";
import { getSoftwareApplicationJsonLd, getOrganizationJsonLd } from "@/lib/jsonld";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthButton from "@/components/AuthButton";
import CookieNotice from "@/components/CookieNotice";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: BRAND_COLOR,
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION_AR,
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION_AR,
    url: SITE_URL,
    siteName: SITE_TITLE,
    locale: "ar_AE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ضريبتي — منصة الضرائب والفوترة المتكاملة في الإمارات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION_AR,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${ibmPlexSansArabic.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareApplicationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationJsonLd()),
          }}
        />
      </head>
      <body className={`${ibmPlexSansArabic.className} antialiased bg-white text-gray-900`}>
        {/* Accessibility: Skip to main content link */}
        <a href="#main-content" className="a11y-skip-link">
          تخطي إلى المحتوى الرئيسي
        </a>

        {/*
          AuthButton is a Server Component that reads the Auth0 session.
          It is passed as a slot to the Header (Client Component) so that
          session-aware login/logout buttons are rendered server-side.
        */}
        <Header authSlot={<AuthButton />} />

        <main id="main-content" role="main">
          {children}
        </main>

        <Footer />
        <CookieNotice />
      </body>
    </html>
  );
}
