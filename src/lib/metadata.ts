import type { Metadata } from "next";
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, BRAND_COLOR } from "./constants";

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

export function generatePageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "",
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_TITLE,
      locale: "ar_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    other: {
      "theme-color": BRAND_COLOR,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
