import type { Metadata } from "next";
import { SITE_URL, BRAND_COLOR } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "شروط الخدمة",
  description:
    "شروط الخدمة لمنصة ضريبتي — الشروط والأحكام المنظمة لاستخدام منصة إدارة الضرائب والفوترة.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "شروط الخدمة | ضريبتي — Daribati",
    description:
      "شروط الخدمة لمنصة ضريبتي — الشروط والأحكام المنظمة لاستخدام منصة إدارة الضرائب والفوترة.",
    url: `${SITE_URL}/terms`,
  },
};

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default function TermsPage() {
  const jsonLd = getWebPageJsonLd(
    "شروط الخدمة - ضريبتي",
    "شروط الخدمة لمنصة ضريبتي",
    `${SITE_URL}/terms`
  );

  const lastUpdated = "18 مايو 2026";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            شروط الخدمة
          </h1>
          <p className="text-lg text-gray-600">
            آخر تحديث: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-10 text-gray-700 leading-relaxed">

            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مقدمة</h2>
              <p>
                مرحباً بك في منصة ضريبتي. تُشغّل هذه المنصة مؤسسة ضريباتي لاستشارات تقنية المعلومات (&ldquo;ضريبتي&rdquo; أو &ldquo;نحن&rdquo; أو &ldquo;الشركة&rdquo;). باستخدامك لمنصتنا، فإنك توافق على الالتزام بشروط الخدمة هذه. يُرجى قراءتها بعناية قبل استخدام أي من خدماتنا.
              </p>
              <p>
                إذا كنت تستخدم المنصة نيابة عن شركة أو كيان قانوني، فإنك تقر بأنك مخول بإلزام ذلك الكيان بهذه الشروط.
              </p>
            </div>

            {/* Service Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">وصف الخدمة</h2>
              <p>
                توفر منصة ضريبتي خدمات برمجية سحابية (SaaS) لإدارة الضرائب والفوترة تشمل:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>حساب وإدارة ضريبة القيمة المضافة (VAT) بنسبة 5%</li>
                <li>حساب وإدارة ضريبة الشركات (Corporate Tax) بنسبة 9%</li>
                <li>إصدار فواتير إلكترونية متوافقة مع الهيئة الاتحادية للضرائب</li>
                <li>استيراد البيانات المالية من ملفات CSV وكشوف الحسابات البنكية</li>
                <li>تصنيف ذكي للمعاملات باستخدام الذكاء الاصطناعي</li>
                <li>مساعد ضريبي ذكي للإجابة على الاستفسارات</li>
                <li>إعداد التقارير الضريبية الدورية</li>
              </ul>
            </div>

            {/* Account Registration */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">التسجيل والحساب</h2>
              <p>
                لاستخدام خدماتنا، يجب عليك إنشاء حساب وتقديم معلومات دقيقة وكاملة. أنت مسؤول عن:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>الحفاظ على سرية بيانات تسجيل الدخول الخاصة بك</li>
                <li>جميع الأنشطة التي تتم من خلال حسابك</li>
                <li>إخطارنا فوراً بأي استخدام غير مصرح به لحسابك</li>
                <li>تحديث بياناتك عند تغيّرها</li>
              </ul>
              <p className="mt-3">
                يحق لنا تعليق أو إلغاء حسابك في حالة انتهاك هذه الشروط أو تقديم معلومات غير صحيحة.
              </p>
            </div>

            {/* Pricing and Payment */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الأسعار والدفع</h2>
              <p>
                تُقدم خدماتنا وفقاً لباقات اشتراك شهرية بالدرهم الإماراتي (AED). بالاشتراك في أي باقة:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>توافق على دفع الرسوم المحددة للباقة المختارة</li>
                <li>يتم التجديد تلقائياً ما لم تقم بالإلغاء قبل نهاية فترة الاشتراك</li>
                <li>يحق لنا تعديل الأسعار مع إشعار مسبق لا يقل عن 30 يوماً</li>
                <li>لا تُسترد الرسوم المدفوعة عن الفترة الحالية عند الإلغاء</li>
                <li>جميع الأسعار لا تشمل ضريبة القيمة المضافة ما لم يُذكر خلاف ذلك</li>
              </ul>
            </div>

            {/* Acceptable Use */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الاستخدام المقبول</h2>
              <p>عند استخدام منصة ضريبتي، يُحظر عليك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>استخدام المنصة لأي غرض غير قانوني أو احتيالي</li>
                <li>إدخال بيانات مالية مزيفة أو مضللة</li>
                <li>محاولة الوصول غير المصرح به إلى أنظمتنا أو بيانات مستخدمين آخرين</li>
                <li>إعادة بيع أو ترخيص الخدمة لأطراف ثالثة دون إذن كتابي</li>
                <li>استخدام الخدمة بطريقة تؤثر سلباً على أداء المنصة للمستخدمين الآخرين</li>
                <li>نسخ أو تعديل أو توزيع أي جزء من المنصة</li>
                <li>استخدام أدوات آلية لاستخراج البيانات من المنصة</li>
              </ul>
            </div>

            {/* Data Accuracy */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">دقة البيانات والمسؤولية</h2>
              <p>
                أنت المسؤول الوحيد عن دقة البيانات المالية التي تدخلها في المنصة. منصة ضريبتي:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>توفر أدوات حسابية وتنظيمية ولا تُعد بديلاً عن الاستشارة الضريبية المهنية</li>
                <li>لا تضمن صحة الحسابات الضريبية في حالة إدخال بيانات غير صحيحة</li>
                <li>لا تتحمل مسؤولية أي غرامات أو عقوبات ناتجة عن بيانات غير دقيقة قدمها المستخدم</li>
                <li>تنصح بمراجعة مستشار ضريبي معتمد للقرارات المالية الهامة</li>
              </ul>
            </div>

            {/* AI Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ميزات الذكاء الاصطناعي</h2>
              <p>
                تستخدم المنصة تقنيات الذكاء الاصطناعي لتصنيف المعاملات والإجابة على الاستفسارات الضريبية. يُرجى ملاحظة أن:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>مخرجات الذكاء الاصطناعي استرشادية وليست استشارة ضريبية أو قانونية</li>
                <li>يجب مراجعة التصنيفات والإجابات قبل اعتمادها في الإقرارات الرسمية</li>
                <li>قد تتم معالجة بياناتك بواسطة مزودي خدمات ذكاء اصطناعي خارجيين وفقاً لسياسة الخصوصية</li>
                <li>دقة النتائج تعتمد على جودة البيانات المدخلة</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الملكية الفكرية</h2>
              <p>
                جميع حقوق الملكية الفكرية المتعلقة بمنصة ضريبتي — بما في ذلك البرمجيات والتصميم والعلامات التجارية والمحتوى — مملوكة لمؤسسة ضريباتي لاستشارات تقنية المعلومات. يُمنح المستخدم ترخيصاً محدوداً وغير حصري لاستخدام المنصة وفقاً لهذه الشروط.
              </p>
              <p className="mt-3">
                تحتفظ أنت بملكية بياناتك المالية والتجارية التي تدخلها في المنصة.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حدود المسؤولية</h2>
              <p>
                إلى أقصى حد يسمح به القانون المعمول به في الإمارات العربية المتحدة:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>تُقدم المنصة &ldquo;كما هي&rdquo; دون ضمانات صريحة أو ضمنية</li>
                <li>لا نتحمل مسؤولية الأضرار غير المباشرة أو التبعية أو فقدان الأرباح</li>
                <li>مسؤوليتنا الإجمالية لا تتجاوز المبالغ المدفوعة منك خلال الأشهر الـ 12 السابقة</li>
                <li>لا نتحمل مسؤولية انقطاع الخدمة بسبب ظروف خارجة عن سيطرتنا</li>
              </ul>
            </div>

            {/* Service Availability */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">توفر الخدمة</h2>
              <p>
                نسعى لتوفير المنصة على مدار الساعة، لكننا لا نضمن توفرها بنسبة 100%. قد تحدث فترات صيانة مجدولة أو انقطاعات طارئة. سنبذل جهداً معقولاً لإخطارك مسبقاً بأي صيانة مخططة.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الإنهاء</h2>
              <p>
                يمكنك إلغاء اشتراكك في أي وقت من خلال إعدادات حسابك. يحق لنا إنهاء أو تعليق حسابك فوراً في حالة:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>انتهاك هذه الشروط</li>
                <li>عدم سداد الرسوم المستحقة</li>
                <li>استخدام المنصة لأغراض غير قانونية</li>
                <li>تقديم معلومات مضللة عند التسجيل</li>
              </ul>
              <p className="mt-3">
                عند الإنهاء، يمكنك طلب تصدير بياناتك خلال 30 يوماً من تاريخ الإنهاء.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">القانون المعمول به</h2>
              <p>
                تخضع هذه الشروط لقوانين الإمارات العربية المتحدة وتُفسر وفقاً لها. أي نزاع ينشأ عن هذه الشروط أو يتعلق بها يخضع للاختصاص الحصري لمحاكم الإمارات العربية المتحدة.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تعديل الشروط</h2>
              <p>
                يحق لنا تعديل هذه الشروط في أي وقت. سنخطرك بالتعديلات الجوهرية عبر البريد الإلكتروني أو من خلال إشعار على المنصة قبل 30 يوماً على الأقل من سريانها. استمرارك في استخدام المنصة بعد سريان التعديلات يُعد موافقة منك على الشروط المحدثة.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
              <p>
                لأي استفسارات تتعلق بشروط الخدمة، يُرجى التواصل معنا:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-semibold text-gray-900">مؤسسة ضريباتي لاستشارات تقنية المعلومات</p>
                <p className="text-sm text-gray-500 mb-3">Daribati IT Consulting</p>
                <p>
                  البريد الإلكتروني:{" "}
                  <a
                    href="mailto:admin@daribati.ae"
                    className="font-medium hover:underline"
                    style={{ color: BRAND_COLOR }}
                  >
                    admin@daribati.ae
                  </a>
                </p>
                <p className="mt-1">الإمارات العربية المتحدة</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
