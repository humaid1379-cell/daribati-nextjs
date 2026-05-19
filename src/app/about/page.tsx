import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, BRAND_COLOR, BRAND_GOLD } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرّف على ضريبتي — المنصة الضريبية والمحاسبية المتكاملة المصممة خصيصاً للشركات في الإمارات العربية المتحدة.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "من نحن | ضريبتي — Daribati",
    description:
      "تعرّف على ضريبتي — المنصة الضريبية والمحاسبية المتكاملة للشركات في الإمارات.",
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageJsonLd(
              "من نحن",
              "تعرّف على ضريبتي — المنصة الضريبية والمحاسبية المتكاملة للشركات في الإمارات.",
              `${SITE_URL}/about`
            )
          ),
        }}
      />

      {/* Hero Section */}
      <section
        className="py-20"
        style={{
          background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #2a5a8f 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            من نحن
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            نحن فريق من الخبراء في الضرائب والتكنولوجيا، نسعى لتبسيط إدارة
            الامتثال الضريبي للشركات في الإمارات.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                رؤيتنا
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                نؤمن بأن إدارة الضرائب يجب أن تكون بسيطة وفعّالة. لذلك أنشأنا
                ضريبتي — منصة متكاملة تجمع بين أحدث التقنيات وأفضل الممارسات
                المحاسبية لمساعدة الشركات في الإمارات على الامتثال الضريبي بكفاءة.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                هدفنا هو أن نكون المنصة الأولى في المنطقة لإدارة الضرائب
                والفوترة، مع التركيز على تجربة مستخدم عربية أولاً ومتوافقة مع
                متطلبات الهيئة الاتحادية للضرائب.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "2024", label: "سنة التأسيس" },
                { value: "الإمارات", label: "المقر الرئيسي" },
                { value: "عربي أولاً", label: "واجهة المستخدم" },
                { value: "100%", label: "متوافق مع FTA" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
                >
                  <div
                    className="text-2xl font-bold mb-2"
                    style={{ color: BRAND_GOLD }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-20" aria-label="قيمنا">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              قيمنا
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              نلتزم بمجموعة من القيم التي توجّه عملنا وتطوير منصتنا.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                titleAr: "البساطة",
                descAr:
                  "نصمم أدواتنا لتكون بسيطة وسهلة الاستخدام. لا تحتاج لخبرة محاسبية لإدارة ضرائبك.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
              },
              {
                titleAr: "الدقة",
                descAr:
                  "نضمن دقة الحسابات والتقارير الضريبية. أنظمتنا محدّثة دائماً وفقاً لأحدث اللوائح.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                titleAr: "الأمان",
                descAr:
                  "بياناتك المالية في أمان تام. نستخدم أحدث تقنيات التشفير وأفضل ممارسات حماية البيانات.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
                >
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.titleAr}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.descAr}
                </p>
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
            انضم إلى مئات الشركات التي تثق بضريبتي
          </h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            ابدأ تجربتك المجانية اليوم واكتشف كيف يمكن لضريبتي تبسيط إدارة
            ضرائبك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105"
              style={{ backgroundColor: BRAND_GOLD, color: "#ffffff" }}
            >
              ابدأ تجربتك المجانية
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
