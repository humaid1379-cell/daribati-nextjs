import type { Metadata } from "next";
import { SITE_URL, BRAND_COLOR } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description:
    "تواصل مع فريق ضريبتي. نحن هنا لمساعدتك في إدارة الضرائب والامتثال الضريبي في الإمارات.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "تواصل معنا | ضريبتي — Daribati",
    description:
      "تواصل مع فريق ضريبتي للحصول على المساعدة والدعم.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getWebPageJsonLd(
              "تواصل معنا",
              "تواصل مع فريق ضريبتي للحصول على المساعدة والدعم.",
              `${SITE_URL}/contact`
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
            تواصل معنا
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
            فريقنا جاهز لمساعدتك. تواصل معنا وسنرد عليك في أقرب وقت ممكن.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #faf8f5 0%, #f5f2ed 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                معلومات التواصل
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">البريد الإلكتروني</h3>
                    <a
                      href="mailto:admin@daribati.ae"
                      className="text-gray-600 hover:underline"
                      style={{ color: BRAND_COLOR }}
                    >
                      admin@daribati.ae
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">الموقع</h3>
                    <p className="text-gray-600">دبي، الإمارات العربية المتحدة</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                    <p className="text-gray-600">الجمعة - السبت: مغلق</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#f0ead6", color: BRAND_COLOR }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">تابعنا</h3>
                    <div className="flex gap-3 mt-2">
                      <a
                        href="https://x.com/daribati_ae"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                        style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                        aria-label="تابعنا على X"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href="https://linkedin.com/company/daribati"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                        style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                        aria-label="تابعنا على لينكد إن"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a
                        href="https://instagram.com/daribati_ae"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
                        style={{ backgroundColor: BRAND_COLOR, color: "#ffffff" }}
                        aria-label="تابعنا على إنستغرام"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                أرسل لنا رسالة
              </h2>
              <form
                action="mailto:admin@daribati.ae"
                method="POST"
                encType="text/plain"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ focusRingColor: BRAND_COLOR } as React.CSSProperties}
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="example@company.com"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    اسم الشركة
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent"
                    placeholder="اسم شركتك (اختياري)"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    الموضوع
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent bg-white"
                  >
                    <option value="general">استفسار عام</option>
                    <option value="sales">المبيعات والأسعار</option>
                    <option value="support">الدعم الفني</option>
                    <option value="partnership">شراكات وتعاون</option>
                    <option value="demo">طلب عرض تجريبي</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-xl text-lg font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: BRAND_COLOR }}
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20" aria-label="الأسئلة الشائعة">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الأسئلة الشائعة
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "كم يستغرق الرد على الاستفسارات؟",
                a: "نرد على جميع الاستفسارات خلال 24 ساعة عمل كحد أقصى.",
              },
              {
                q: "هل يمكنني طلب عرض تجريبي للمنصة؟",
                a: "نعم! يمكنك طلب عرض تجريبي مباشر من خلال نموذج التواصل أعلاه أو عبر البريد الإلكتروني.",
              },
              {
                q: "هل تقدمون دعماً فنياً باللغة العربية؟",
                a: "بالتأكيد. فريق الدعم لدينا يتحدث العربية والإنجليزية لخدمتكم بأفضل شكل.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
