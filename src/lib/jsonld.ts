import { SITE_URL, SITE_DESCRIPTION, FEATURES } from "./constants";

export function getSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ضريبتي - Daribati",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      lowPrice: "99",
      highPrice: "799",
      offerCount: "3",
    },
    author: {
      "@type": "Organization",
      name: "Daribati",
      url: SITE_URL,
    },
    inLanguage: ["ar", "en"],
    availableLanguage: ["ar", "en"],
    featureList: FEATURES,
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Daribati",
    alternateName: "ضريبتي",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  };
}

export function getWebPageJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      name: "ضريبتي - Daribati",
      url: SITE_URL,
    },
  };
}
