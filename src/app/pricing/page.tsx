import Link from "next/link";
import type { Metadata } from "next";
import { PRICING_PLANS, SITE_URL, BRAND_COLOR } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "الأسعار والباقات",
  description:
    "اختر الباقة المناسبة لشركتك. باقات تبدأ من 99 درهم شهرياً لإدارة ضريبة القيمة المضافة وضريبة الشركات في الإمارات.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
  openGraph: {
    title: "الأسعار والباقات | ضريبتي — Daribati",
    description:
      "اختر الباقة المناسبة لشركتك. باقات تبدأ من 99 درهم شهرياً لإدارة ضريبة القيمة المضافة وضريبة الشركات في الإمارات.",
    url: `${SITE_URL}/pricing`,
  },
};

export const runtime = 'edge';
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default function PricingPage() {
  const jsonLd = getWebPageJsonLd(
    "باقات وأسعار ضريبتي",
    "اختر الباقة المناسبة لشركتك",
    `${SITE_URL}/pricing`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visually hidden H1 for accessibility */}
      <h1 className="sr-only">باقات وأسعار ضريبتي</h1>

      {/* Hero */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            باقات تناسب كل الأعمال
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختر الباقة المناسبة لحجم أعمالك. جميع الباقات تشمل تحديثات مجانية
            ودعم فني.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 border-2 transition-all ${
                  plan.popular
                    ? "border-[#1e3a5f] shadow-xl scale-105"
                    : "border-gray-200 shadow-sm hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: BRAND_COLOR }}
                  >
                    الأكثر شيوعاً
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.nameAr}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.nameEn}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className="text-5xl font-bold"
                      style={{ color: BRAND_COLOR }}
                    >
                      {plan.price}
                    </span>
                    <div className="text-sm text-gray-500">
                      <div>{plan.currency}</div>
                      <div>/ {plan.periodAr}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{plan.subtitleAr}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke={BRAND_COLOR}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{feature.ar}</span>
                    </li>
                  ))}
                </ul>

                {plan.id === "enterprise" ? (
                <a
                  href="mailto:admin@daribati.ae"
                  className="block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all border-2 hover:bg-gray-50"
                  style={{ borderColor: BRAND_COLOR, color: BRAND_COLOR }}
                >
                  تواصل معنا
                </a>
              ) : (
                <Link
                  href="/dashboard/"
                  className={`block w-full py-3 px-6 rounded-xl text-center font-semibold transition-all ${
                    plan.popular
                      ? "text-white hover:opacity-90"
                      : "border-2 hover:bg-gray-50"
                  }`}
                  style={
                    plan.popular
                      ? { backgroundColor: BRAND_COLOR }
                      : { borderColor: BRAND_COLOR, color: BRAND_COLOR }
                  }
                >
                  ابدأ الآن
                </Link>
              )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            الأسئلة الشائعة
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "هل يمكنني تغيير الباقة لاحقاً؟",
                a: "نعم، يمكنك الترقية أو التخفيض في أي وقت. سيتم احتساب الفرق بشكل تناسبي.",
              },
              {
                q: "هل هناك فترة تجريبية مجانية؟",
                a: "نعم، جميع الباقات تأتي مع فترة تجريبية مجانية لمدة 14 يوماً.",
              },
              {
                q: "ما هي طرق الدفع المتاحة؟",
                a: "نقبل بطاقات الائتمان والخصم، والتحويل البنكي، وApple Pay.",
              },
              {
                q: "هل البيانات آمنة؟",
                a: "نعم، نستخدم تشفير SSL/TLS وتخزين البيانات في مراكز بيانات معتمدة في الإمارات.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
