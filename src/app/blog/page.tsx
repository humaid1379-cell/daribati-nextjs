import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, BRAND_COLOR, BRAND_GOLD } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "المدونة",
  description:
    "مدونة ضريبتي — مقالات ونصائح حول الضرائب والامتثال الضريبي في الإمارات. قريباً.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "المدونة | ضريبتي — Daribati",
    description:
      "مدونة ضريبتي — مقالات ونصائح حول الضرائب والامتثال الضريبي في الإمارات.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageJsonLd(
              "المدونة",
              "مدونة ضريبتي — مقالات ونصائح حول الضرائب والامتثال الضريبي في الإمارات.",
              `${SITE_URL}/blog`
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
            المدونة
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            مقالات ونصائح حول الضرائب والامتثال الضريبي في الإمارات.
          </p>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section
        className="py-32"
        style={{ background: "linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icon */}
          <div
            className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
          >
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            قريباً...
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            نعمل حالياً على إعداد محتوى قيّم حول الضرائب والامتثال الضريبي في
            الإمارات. ستجد هنا قريباً مقالات ونصائح تساعدك في إدارة أعمالك بشكل
            أفضل.
          </p>
          <p className="text-gray-500 mb-10">
            تابعنا على وسائل التواصل الاجتماعي لتكون أول من يعرف عند إطلاق المدونة.
          </p>

          {/* Upcoming Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {[
              "دليل ضريبة القيمة المضافة",
              "أساسيات ضريبة الشركات",
              "نصائح للامتثال الضريبي",
              "الفوترة الإلكترونية",
              "إعفاءات المناطق الحرة",
              "التخطيط الضريبي الذكي",
            ].map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <p className="text-gray-700 font-medium">{topic}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-xl text-lg font-bold text-white transition-all hover:scale-105"
              style={{ backgroundColor: BRAND_COLOR }}
            >
              العودة للرئيسية
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 border-2"
              style={{ borderColor: BRAND_GOLD, color: BRAND_GOLD }}
            >
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
