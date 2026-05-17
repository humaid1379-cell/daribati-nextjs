import Link from "next/link";
import { BRAND_COLOR } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="footer-section"
      style={{ backgroundColor: BRAND_COLOR }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-bold text-white"
              aria-label="ضريبتي - الصفحة الرئيسية"
            >
              ضريبتي
            </Link>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#b8c8d8" }}>
              منصة ضريبية ومحاسبية متكاملة للشركات في الإمارات. أتمتة الامتثال
              الضريبي مع فواتير متوافقة مع الهيئة الاتحادية للضرائب.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "#b8c8d8" }}
                >
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "#b8c8d8" }}
                >
                  الأسعار
                </Link>
              </li>
              <li>
                <Link
                  href="/calculator"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "#b8c8d8" }}
                >
                  حاسبة الضرائب
                </Link>
              </li>
              <li>
                <Link
                  href="/compliance"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "#b8c8d8" }}
                >
                  الامتثال الضريبي
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">خدماتنا</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm" style={{ color: "#b8c8d8" }}>
                  إدارة ضريبة القيمة المضافة
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: "#b8c8d8" }}>
                  ضريبة الشركات
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: "#b8c8d8" }}>
                  الفوترة الإلكترونية
                </span>
              </li>
              <li>
                <span className="text-sm" style={{ color: "#b8c8d8" }}>
                  التقارير المالية
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@daribati.ae"
                  className="text-sm hover:text-white transition-colors"
                  style={{ color: "#b8c8d8" }}
                >
                  support@daribati.ae
                </a>
              </li>
              <li>
                <span className="text-sm" style={{ color: "#b8c8d8" }}>
                  الإمارات العربية المتحدة
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: "#b8c8d8" }}>
              &copy; {currentYear} ضريبتي (Daribati). جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/compliance"
                className="text-sm hover:text-white transition-colors"
                style={{ color: "#b8c8d8" }}
              >
                سياسة الخصوصية
              </Link>
              <Link
                href="/compliance"
                className="text-sm hover:text-white transition-colors"
                style={{ color: "#b8c8d8" }}
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
