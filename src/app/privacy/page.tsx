import type { Metadata } from "next";
import { SITE_URL, BRAND_COLOR } from "@/lib/constants";
import { getWebPageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description:
    "سياسة الخصوصية لمنصة ضريبتي — كيف نجمع ونستخدم ونحمي بياناتك المالية والشخصية.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "سياسة الخصوصية | ضريبتي — Daribati",
    description:
      "سياسة الخصوصية لمنصة ضريبتي — كيف نجمع ونستخدم ونحمي بياناتك المالية والشخصية.",
    url: `${SITE_URL}/privacy`,
  },
};

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  const jsonLd = getWebPageJsonLd(
    "سياسة الخصوصية - ضريبتي",
    "سياسة الخصوصية لمنصة ضريبتي",
    `${SITE_URL}/privacy`
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
            سياسة الخصوصية
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
                تلتزم مؤسسة ضريباتي لاستشارات تقنية المعلومات (&ldquo;ضريبتي&rdquo; أو &ldquo;نحن&rdquo;) بحماية خصوصية مستخدمي منصتنا وفقاً لأحكام المرسوم بقانون اتحادي رقم (45) لسنة 2021 بشأن حماية البيانات الشخصية والتشريعات المعمول بها في دولة الإمارات العربية المتحدة. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وتخزين وحماية المعلومات الشخصية والمالية التي تقدمها عند استخدام منصة ضريبتي لإدارة الضرائب والفوترة.
              </p>
              <p>
                باستخدامك لمنصة ضريبتي، فإنك توافق على الممارسات الموضحة في هذه السياسة. إذا كنت لا توافق على أي جزء من هذه السياسة، يُرجى عدم استخدام خدماتنا.
              </p>
            </div>

            {/* Data We Collect */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">البيانات التي نجمعها</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">بيانات الحساب</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الاسم الكامل وعنوان البريد الإلكتروني</li>
                <li>اسم الشركة ورقم الرخصة التجارية</li>
                <li>رقم التسجيل الضريبي (TRN)</li>
                <li>عنوان الشركة ومعلومات الاتصال</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">البيانات المالية</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>الفواتير والمعاملات المالية</li>
                <li>بيانات ضريبة القيمة المضافة وضريبة الشركات</li>
                <li>ملفات CSV وكشوف الحسابات البنكية المستوردة</li>
                <li>التقارير الضريبية والإقرارات</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">بيانات الاستخدام</h3>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>سجلات الدخول وعناوين IP</li>
                <li>نوع المتصفح ونظام التشغيل</li>
                <li>الصفحات التي تمت زيارتها ومدة الجلسة</li>
                <li>تفاعلات المستخدم مع المنصة</li>
              </ul>
            </div>

            {/* How We Use Data */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">كيف نستخدم بياناتك</h2>
              <ul className="list-disc list-inside space-y-2 mr-4">
                <li>تقديم خدمات إدارة الضرائب والفوترة</li>
                <li>حساب ضريبة القيمة المضافة وضريبة الشركات</li>
                <li>إنشاء الفواتير والتقارير الضريبية</li>
                <li>تحسين أداء المنصة وتجربة المستخدم</li>
                <li>إرسال إشعارات مهمة متعلقة بحسابك</li>
                <li>الامتثال للمتطلبات القانونية والتنظيمية في الإمارات</li>
                <li>تشغيل ميزات الذكاء الاصطناعي (التصنيف الذكي، المساعد الضريبي، مسح الفواتير)</li>
              </ul>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حماية البيانات</h2>
              <p>
                نتخذ تدابير أمنية صارمة لحماية بياناتك المالية والشخصية:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>تشفير البيانات أثناء النقل باستخدام بروتوكول TLS 1.3</li>
                <li>تشفير البيانات المخزنة باستخدام معيار AES-256</li>
                <li>المصادقة متعددة العوامل لحماية الحسابات</li>
                <li>نسخ احتياطية مشفرة ومنتظمة</li>
                <li>مراقبة أمنية على مدار الساعة</li>
                <li>الامتثال لمعايير أمن المعلومات الدولية</li>
                <li>استضافة عبر بنية تحتية سحابية عالمية مع حماية متقدمة ضد هجمات DDoS</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">مشاركة البيانات</h2>
              <p>
                لا نبيع أو نؤجر بياناتك الشخصية أو المالية لأي طرف ثالث. قد نشارك بياناتك فقط في الحالات التالية:
              </p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>عند الطلب من الهيئة الاتحادية للضرائب أو الجهات الحكومية المختصة بموجب القانون</li>
                <li>مع مزودي الخدمات الفنية (الاستضافة، المصادقة) بموجب اتفاقيات سرية صارمة</li>
                <li>مع مزودي خدمات الذكاء الاصطناعي لمعالجة البيانات وفقاً لاتفاقيات حماية البيانات</li>
                <li>لحماية حقوقنا القانونية أو منع الاحتيال</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الاحتفاظ بالبيانات</h2>
              <p>
                نحتفظ ببياناتك المالية والضريبية لمدة لا تقل عن 5 سنوات وفقاً لمتطلبات الهيئة الاتحادية للضرائب. يمكنك طلب حذف حسابك وبياناتك غير المطلوبة قانونياً في أي وقت عبر التواصل معنا.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">ملفات تعريف الارتباط (Cookies)</h2>
              <p>
                نستخدم ملفات تعريف الارتباط الضرورية لتشغيل المنصة وتأمين جلسات المستخدمين. قد نستخدم أيضاً ملفات تعريف ارتباط تحليلية لفهم كيفية استخدام المنصة وتحسينها. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.
              </p>
            </div>

            {/* User Rights */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">حقوقك</h2>
              <p>يحق لك:</p>
              <ul className="list-disc list-inside space-y-2 mr-4 mt-3">
                <li>الوصول إلى بياناتك الشخصية والمالية المخزنة لدينا</li>
                <li>تصحيح أي بيانات غير دقيقة</li>
                <li>طلب حذف بياناتك (مع مراعاة المتطلبات القانونية)</li>
                <li>تصدير بياناتك بصيغة قابلة للقراءة</li>
                <li>الاعتراض على معالجة بياناتك لأغراض تسويقية</li>
                <li>سحب موافقتك في أي وقت</li>
              </ul>
            </div>

            {/* Children */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">الأطفال</h2>
              <p>
                منصة ضريبتي مصممة للاستخدام التجاري (B2B) ولا تستهدف الأفراد دون سن 18 عاماً. لا نجمع عن قصد بيانات من القاصرين.
              </p>
            </div>

            {/* Changes */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تعديلات على السياسة</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار بارز على المنصة. يُعد استمرارك في استخدام المنصة بعد نشر التعديلات موافقة منك على السياسة المحدثة.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">تواصل معنا</h2>
              <p>
                لأي استفسارات تتعلق بسياسة الخصوصية أو لممارسة حقوقك، يُرجى التواصل معنا:
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
                <p className="mt-1">دبي، الإمارات العربية المتحدة</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
