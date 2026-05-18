import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";
import TaxCalculator from "@/components/TaxCalculator";

export const metadata: Metadata = {
  title: "حاسبة الضرائب",
  description:
    "احسب ضريبة القيمة المضافة وضريبة الشركات في الإمارات بسهولة. أداة مجانية لحساب الضرائب المستحقة على أعمالك.",
  alternates: {
    canonical: `${SITE_URL}/calculator`,
  },
  openGraph: {
    title: "حاسبة الضرائب | ضريبتي — Daribati",
    description:
      "احسب ضريبة القيمة المضافة وضريبة الشركات في الإمارات بسهولة.",
    url: `${SITE_URL}/calculator`,
  },
};

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export default function CalculatorPage() {
  const jsonLd = getWebPageJsonLd(
    "حاسبة الضرائب - ضريبتي",
    "احسب ضريبة القيمة المضافة وضريبة الشركات في الإمارات",
    `${SITE_URL}/calculator`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            حاسبة الضرائب
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            احسب ضريبة القيمة المضافة (VAT) وضريبة الشركات (Corporate Tax)
            المستحقة على أعمالك في الإمارات.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TaxCalculator />
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            معلومات ضريبية مهمة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ضريبة القيمة المضافة (VAT)
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>النسبة الأساسية: 5%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>حد التسجيل الإلزامي: 375,000 درهم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>حد التسجيل الاختياري: 187,500 درهم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>تقديم الإقرارات: ربع سنوي</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ضريبة الشركات (Corporate Tax)
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>النسبة: 9% على الأرباح فوق 375,000 درهم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>0% على الأرباح حتى 375,000 درهم</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>تطبق على السنوات المالية من يونيو 2023</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>إعفاءات خاصة لشركات المناطق الحرة المؤهلة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
