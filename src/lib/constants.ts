export const SITE_URL = "https://daribati.ae";
export const SITE_NAME_AR = "ضريبتي";
export const SITE_NAME_EN = "Daribati";
export const SITE_TITLE = "ضريبتي — Daribati";
export const BRAND_COLOR = "#1e3a5f";
export const BRAND_COLOR_LIGHT = "#2a5a8f";

export const SITE_DESCRIPTION =
  "UAE Tax + Billing SaaS platform for businesses, SMEs, and free zone companies. Automate VAT and Corporate Tax compliance with smart CSV import, FTA-compliant invoicing, and Arabic-first dashboard.";

export const SITE_DESCRIPTION_AR =
  "منصة ضريبية ومحاسبية متكاملة للشركات والمؤسسات الصغيرة والمتوسطة في الإمارات. أتمتة الامتثال لضريبة القيمة المضافة وضريبة الشركات مع استيراد CSV ذكي وفواتير متوافقة مع الهيئة الاتحادية للضرائب ولوحة تحكم عربية أولاً.";

export const FEATURES = [
  "VAT Compliance",
  "Corporate Tax Filing",
  "FTA-Compliant Invoicing",
  "Smart CSV Import",
  "Arabic-First Dashboard",
  "Free Zone Company Support",
  "AI-Powered Transaction Classification",
  "AI Tax Assistant",
];

export const PRICING_PLANS = [
  {
    id: "starter",
    nameAr: "المبتدئ",
    nameEn: "Starter",
    price: 99,
    currency: "AED",
    period: "month",
    periodAr: "شهرياً",
    subtitleAr: "للتجربة والبدء",
    subtitleEn: "To get started",
    popular: false,
    features: [
      { ar: "إدارة ضريبة القيمة المضافة", en: "VAT Management" },
      { ar: "حتى 100 فاتورة شهرياً", en: "Up to 100 invoices/month" },
      { ar: "تقارير أساسية", en: "Basic Reports" },
      { ar: "دعم عبر البريد الإلكتروني", en: "Email Support" },
      { ar: "مستخدم واحد", en: "1 User" },
    ],
  },
  {
    id: "business",
    nameAr: "الأعمال",
    nameEn: "Business",
    price: 299,
    currency: "AED",
    period: "month",
    periodAr: "شهرياً",
    subtitleAr: "للشركات المتنامية",
    subtitleEn: "For growing businesses",
    popular: true,
    features: [
      { ar: "جميع مميزات المبتدئ", en: "All Starter features" },
      { ar: "ضريبة الشركات", en: "Corporate Tax" },
      { ar: "فواتير غير محدودة", en: "Unlimited Invoices" },
      { ar: "استيراد CSV ذكي", en: "Smart CSV Import" },
      { ar: "تقارير متقدمة", en: "Advanced Reports" },
      { ar: "حتى 5 مستخدمين", en: "Up to 5 Users" },
      { ar: "تصنيف ذكي بالذكاء الاصطناعي", en: "AI-Powered Classification" },
      { ar: "دعم ذو أولوية", en: "Priority Support" },
    ],
  },
  {
    id: "enterprise",
    nameAr: "المؤسسات",
    nameEn: "Enterprise",
    price: 799,
    currency: "AED",
    period: "month",
    periodAr: "شهرياً",
    subtitleAr: "للمجموعات والشركات الكبرى",
    subtitleEn: "For groups and large enterprises",
    popular: false,
    features: [
      { ar: "جميع مميزات الأعمال", en: "All Business features" },
      { ar: "مستخدمون غير محدودون", en: "Unlimited Users" },
      { ar: "API مخصص", en: "Custom API" },
      { ar: "مدير حساب مخصص", en: "Dedicated Account Manager" },
      { ar: "تكامل مع أنظمة ERP", en: "ERP Integration" },
      { ar: "مساعد ضريبي ذكي", en: "AI Tax Assistant" },
      { ar: "تدريب مخصص", en: "Custom Training" },
      { ar: "اتفاقية مستوى الخدمة", en: "SLA Agreement" },
    ],
  },
];

export const NAV_LINKS = [
  { href: "/", labelAr: "الرئيسية", labelEn: "Home" },
  { href: "/pricing", labelAr: "الأسعار", labelEn: "Pricing" },
  { href: "/calculator", labelAr: "الحاسبة", labelEn: "Calculator" },
  { href: "/compliance", labelAr: "الامتثال", labelEn: "Compliance" },
];
