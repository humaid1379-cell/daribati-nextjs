import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "الامتثال الضريبي",
  description:
    "تعرف على متطلبات الامتثال الضريبي في الإمارات. دليل شامل لضريبة القيمة المضافة وضريبة الشركات ومتطلبات الهيئة الاتحادية للضرائب.",
  alternates: {
    canonical: `${SITE_URL}/compliance`,
  },
  openGraph: {
    title: "الامتثال الضريبي | ضريبتي — Daribati",
    description:
      "تعرف على متطلبات الامتثال الضريبي في الإمارات.",
    url: `${SITE_URL}/compliance`,
  },
};

export const runtime = 'edge';
export const dynamic = "force-dynamic";

const complianceTopics = [
  {
    titleAr: "ضريبة القيمة المضافة (VAT)",
    descAr:
      "تم تطبيق ضريبة القيمة المضافة في الإمارات بنسبة 5% اعتباراً من يناير 2018. يجب على جميع الشركات التي تتجاوز إيراداتها السنوية 375,000 درهم التسجيل في ضريبة القيمة المضافة.",
    items: [
      "التسجيل الإلزامي عند تجاوز حد 375,000 درهم",
      "تقديم الإقرارات الضريبية في المواعيد المحددة",
      "الاحتفاظ بالسجلات والفواتير لمدة 5 سنوات",
      "إصدار فواتير ضريبية متوافقة مع متطلبات الهيئة الاتحادية للضرائب",
      "حساب الضريبة المستحقة والمستردة بدقة",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    titleAr: "ضريبة الشركات (Corporate Tax)",
    descAr:
      "تم تطبيق ضريبة الشركات في الإمارات بنسبة 9% على الأرباح التي تتجاوز 375,000 درهم اعتباراً من يونيو 2023. تهدف إلى تنويع مصادر الدخل الحكومي.",
    items: [
      "نسبة 0% على الأرباح حتى 375,000 درهم",
      "نسبة 9% على الأرباح فوق 375,000 درهم",
      "إعفاءات خاصة لشركات المناطق الحرة المؤهلة",
      "التسجيل الإلزامي لجميع الشركات الخاضعة",
      "تقديم الإقرارات السنوية في المواعيد المحددة",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    titleAr: "الفوترة الإلكترونية",
    descAr:
      "تتطلب الهيئة الاتحادية للضرائب أن تكون الفواتير الضريبية متوافقة مع معايير محددة تشمل معلومات البائع والمشتري ورقم التسجيل الضريبي.",
    items: [
      "اسم وعنوان المورد ورقم التسجيل الضريبي",
      "اسم وعنوان المستلم ورقم التسجيل الضريبي",
      "تاريخ الإصدار ورقم الفاتورة التسلسلي",
      "وصف السلع أو الخدمات والكمية والسعر",
      "مبلغ الضريبة والإجمالي بالدرهم الإماراتي",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    titleAr: "الغرامات والعقوبات",
    descAr:
      "تفرض الهيئة الاتحادية للضرائب غرامات على المخالفات الضريبية. من المهم الالتزام بالمواعيد والمتطلبات لتجنب العقوبات المالية. تختلف قيمة الغرامات حسب نوع المخالفة وتكرارها.",
    items: [
      "غرامات على التأخر في التسجيل الضريبي",
      "غرامات على التأخر في تقديم الإقرارات الضريبية",
      "غرامات على التأخر في سداد الضرائب المستحقة",
      "غرامات على عدم الاحتفاظ بالسجلات المحاسبية",
      "غرامات على تقديم بيانات غير صحيحة للهيئة",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
];

export default function CompliancePage() {
  const jsonLd = getWebPageJsonLd(
    "الامتثال الضريبي - ضريبتي",
    "دليل شامل للامتثال الضريبي في الإمارات",
    `${SITE_URL}/compliance`
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="py-16 lg:py-20" style={{ background: "linear-gradient(135deg, #F3F4F6 0%, #E8F4FD 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            دليل الامتثال الضريبي
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            كل ما تحتاج معرفته عن الامتثال الضريبي في الإمارات العربية المتحدة.
            ابقَ ملتزماً بمتطلبات الهيئة الاتحادية للضرائب.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 text-center">
            هذا الدليل للأغراض التوعوية فقط ولا يُعد استشارة ضريبية أو قانونية. يُرجى مراجعة مستشار ضريبي معتمد أو الرجوع إلى الموقع الرسمي للهيئة الاتحادية للضرائب للحصول على معلومات محدثة.
          </div>
        </div>
      </section>

      {/* Compliance Topics */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {complianceTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "rgba(14, 145, 140, 0.1)",
                      color: "#0E918C",
                    }}
                  >
                    {topic.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {topic.titleAr}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {topic.descAr}
                    </p>
                  </div>
                </div>
                <div className="mr-[72px]">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    المتطلبات الرئيسية
                  </h3>
                  <ul className="space-y-3">
                    {topic.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="#0E918C"
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
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{
          background: `linear-gradient(135deg, #0A2647 0%, #0E918C 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            هل تحتاج مساعدة في الامتثال الضريبي؟
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            ضريبتي يساعدك على البقاء متوافقاً مع المتطلبات الضريبية
            تلقائياً. جرّب المنصة مجاناً لمدة 14 يوماً.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white rounded-xl text-lg font-bold transition-all hover:bg-blue-50"
              style={{ color: "#0E918C" }}
            >
              اطّلع على الباقات
            </Link>
            <Link
              href="/calculator"
              className="px-8 py-4 border-2 border-white/30 rounded-xl text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              احسب ضرائبك
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
