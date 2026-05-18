import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_DESCRIPTION_AR, BRAND_COLOR, BRAND_GOLD } from "@/lib/constants";

export const metadata: Metadata = {
  title: "ضريبتي — Daribati | منصة الضرائب والفوترة في الإمارات",
  description: SITE_DESCRIPTION_AR,
  alternates: {
    canonical: SITE_URL,
  },
};

export const runtime = 'edge';
export const dynamic = "force-dynamic";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    titleAr: "إدارة ضريبة القيمة المضافة",
    titleEn: "VAT Management",
    descAr: "حساب وتتبع ضريبة القيمة المضافة تلقائياً مع تقارير متوافقة مع الهيئة الاتحادية للضرائب.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    titleAr: "ضريبة الشركات",
    titleEn: "Corporate Tax",
    descAr: "إدارة شاملة لضريبة الشركات بنسبة 9% مع حسابات تلقائية وتقارير دقيقة.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    titleAr: "فواتير متوافقة مع FTA",
    titleEn: "FTA-Compliant Invoicing",
    descAr: "إنشاء فواتير إلكترونية متوافقة مع متطلبات الهيئة الاتحادية للضرائب.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    titleAr: "استيراد CSV ذكي",
    titleEn: "Smart CSV Import",
    descAr: "استيراد بياناتك المالية بسهولة من ملفات CSV مع تعيين تلقائي للحقول.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    titleAr: "لوحة تحكم عربية أولاً",
    titleEn: "Arabic-First Dashboard",
    descAr: "واجهة مستخدم مصممة خصيصاً للمستخدم العربي مع دعم كامل للغة العربية.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    titleAr: "دعم شركات المناطق الحرة",
    titleEn: "Free Zone Support",
    descAr: "حلول مخصصة لشركات المناطق الحرة مع معالجة ضريبية متخصصة وإعفاءات مؤهلة.",
  },
];

const stats = [
  { value: "5%", labelAr: "نسبة ضريبة القيمة المضافة" },
  { value: "9%", labelAr: "نسبة ضريبة الشركات" },
  { value: "14 يوماً", labelAr: "تجربة مجانية" },
  { value: "3 باقات", labelAr: "تناسب جميع الأعمال" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: BRAND_COLOR }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              منصة الضرائب والفوترة
              <br />
              <span style={{ color: "#e8c94a" }}>المتكاملة في الإمارات</span>
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              أتمتة الامتثال لضريبة القيمة المضافة وضريبة الشركات مع فواتير
              متوافقة مع الهيئة الاتحادية للضرائب ولوحة تحكم عربية أولاً.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white rounded-xl text-lg font-bold transition-all hover:bg-blue-50 hover:scale-105"
                style={{ color: BRAND_COLOR }}
              >
                جرّب مجاناً لمدة 14 يوماً
              </Link>
              <Link
                href="/calculator"
                className="px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold text-white transition-all hover:bg-white/10"
              >
                احسب ضرائبك
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100" aria-label="إحصائيات">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: BRAND_COLOR }}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.labelAr}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ background: "linear-gradient(180deg, #faf8f5 0%, #f5f2ed 100%)" }} aria-label="مميزات المنصة">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              كل ما تحتاجه لإدارة ضرائبك
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              منصة متكاملة تجمع بين إدارة الضرائب والفوترة والتقارير المالية في
              مكان واحد.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.titleAr}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.descAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20" aria-label="كيف يعمل">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              كيف يعمل ضريبتي؟
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ثلاث خطوات بسيطة للبدء في إدارة ضرائبك بكفاءة.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                titleAr: "سجّل حسابك",
                descAr: "أنشئ حسابك في دقائق وأضف بيانات شركتك. تجربة مجانية لمدة 14 يوماً.",
              },
              {
                step: "2",
                titleAr: "استورد بياناتك",
                descAr: "استورد فواتيرك وبياناتك المالية عبر CSV أو أدخلها يدوياً.",
              },
              {
                step: "3",
                titleAr: "أدِر ضرائبك",
                descAr: "احصل على تقارير ضريبية دقيقة وفواتير متوافقة تلقائياً.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5"
                  style={{ background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #4a90d9 100%)` }}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.titleAr}
                </h3>
                <p className="text-gray-600">{item.descAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #2a5a8f 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            ابدأ إدارة ضرائبك بذكاء اليوم
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            منصة مصممة خصيصاً للشركات في الإمارات لإدارة
            الامتثال الضريبي بكفاءة. جرّب مجاناً لمدة 14 يوماً.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105"
                style={{ backgroundColor: BRAND_GOLD, color: "#ffffff" }}
              >
                اختر باقتك وابدأ التجربة
            </Link>
            <Link
              href="/calculator"
              className="px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              جرّب الحاسبة الضريبية
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
