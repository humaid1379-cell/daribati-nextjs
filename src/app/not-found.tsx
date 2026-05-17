import Link from "next/link";
import { BRAND_COLOR } from "@/lib/constants";

export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
      <div className="text-center max-w-md">
        <div
          className="text-8xl font-bold mb-4"
          style={{ color: BRAND_COLOR }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          الصفحة غير موجودة
        </h1>
        <p className="text-gray-600 mb-8">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: BRAND_COLOR }}
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
