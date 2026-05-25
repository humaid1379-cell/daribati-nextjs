import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, BRAND_GOLD } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "مميزات المنصة",
  description:
    "اكتشف مميزات منصة ضريبتي: إدارة ضريبة القيمة المضافة، ضريبة الشركات، الفوترة الإلكترونية، التقارير الذكية، واستيراد البيانات تلقائياً.",
  alternates: {
    canonical: `${SITE_URL}/features`,
  },
  openGraph: {
    title: "مميزات المنصة | ضريبتي — Daribati",
    description:
      "اكتشف مميزات منصة ضريبتي لإدارة الضرائب والفوترة في الإمارات.",
    url: `${SITE_URL}/features`,
  },
};

const features = [
  {
    titleAr: "إدارة ضريبة القيمة المضافة",
    descAr:
      "احسب ضريبة القيمة المضافة تلقائياً وقدّم إقراراتك الضريبية بسهولة. متوافق مع متطلبات الهيئة الاتحادية للضرائب.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    titleAr: "ضريبة الشركات",
    descAr:
      "إدارة شاملة لضريبة الشركات بنسبة 9%. حساب الأرباح الخاضعة للضريبة وتقديم الإقرارات في المواعيد المحددة.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    titleAr: "الفوترة الإلكترونية",
    descAr:
      "أنشئ فواتير ضريبية متوافقة مع الهيئة الاتحادية للضرائب. إرسال تلقائي وتتبع حالة الدفع.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    titleAr: "استيراد CSV ذكي",
    descAr:
      "استورد بياناتك المالية من ملفات CSV بسهولة. تصنيف ذكي بالذكاء الاصطناعي للمعاملات المالية.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    titleAr: "تقارير ذكية",
    descAr:
      "تقارير مالية وضريبية شاملة. لوحة تحكم تفاعلية مع رسوم بيانية ومؤشرات أداء رئيسية.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    titleAr: "مساعد ذكاء اصطناعي",
    descAr:
      "مساعد ضريبي ذكي يجيب على أسئلتك ويساعدك في اتخاذ القرارات المالية الصحيحة.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    titleAr: "إدارة متعددة المستخدمين",
    descAr:
      "أضف فريقك وحدد الصلاحيات لكل مستخدم. تعاون فعّال مع سجل كامل للتغييرات.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    titleAr: "تكامل مع أنظمة ERP",
    descAr:
      "تكامل سلس مع أنظمة تخطيط الموارد المؤسسية. API مفتوح للربط مع أي نظام محاسبي.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    titleAr: "أمان وخصوصية",
    descAr:
      "تشفير كامل للبيانات مع نسخ احتياطي يومي. متوافق مع معايير حماية البيانات الدولية.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
];

export default function FeaturesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageJsonLd(
              "مميزات المنصة",
              "اكتشف مميزات منصة ضريبتي لإدارة الضرائب والفوترة في الإمارات.",
              `${SITE_URL}/features`
            )
          ),
        }}
      />

      {/* Hero Section */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, #0A2647 0%, #0E918C 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            مميزات منصة ضريبتي
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            منصة متكاملة تجمع بين إدارة الضرائب والفوترة والتقارير المالية.
            مصممة خصيصاً للشركات في الإمارات العربية المتحدة.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #F3F4F6 0%, #E8F4FD 100%)" }}
        aria-label="مميزات المنصة"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "rgba(14, 145, 140, 0.1)", color: "#0E918C" }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.titleAr}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20" aria-label="لماذا ضريبتي">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار ضريبتي؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه لإدارة الامتثال الضريبي بكفاءة وسهولة.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "100%", label: "متوافق مع الهيئة الاتحادية للضرائب" },
              { value: "5 دقائق", label: "لإعداد حسابك والبدء" },
              { value: "دعم فني", label: "عبر البريد الإلكتروني" },
              { value: "256-bit", label: "تشفير البيانات" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: BRAND_GOLD }}
                >
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, #0A2647 0%, #0E918C 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ابدأ تجربتك المجانية اليوم
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            جرّب جميع المميزات مجاناً لمدة 14 يوماً. لا حاجة لبطاقة ائتمان.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105"
              style={{ backgroundColor: BRAND_GOLD, color: "#ffffff" }}
            >
              اختر باقتك وابدأ
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
