"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND_COLOR } from "@/lib/constants";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const accepted = localStorage.getItem("daribati_cookies_accepted");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("daribati_cookies_accepted", "all");
    setVisible(false);
  };

  const handleRejectOptional = () => {
    localStorage.setItem("daribati_cookies_accepted", "essential");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6"
      role="dialog"
      aria-label="إشعار ملفات تعريف الارتباط"
      aria-describedby="cookie-notice-desc"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p id="cookie-notice-desc" className="text-sm text-gray-700 leading-relaxed">
            نستخدم ملفات تعريف الارتباط الضرورية لتشغيل المنصة وتأمين جلستك، وملفات تحليلية اختيارية لتحسين تجربتك.
            يمكنك قبول جميع ملفات تعريف الارتباط أو الاكتفاء بالضرورية فقط. لمزيد من التفاصيل، راجع{" "}
            <Link
              href="/privacy"
              className="font-medium underline hover:no-underline"
              style={{ color: BRAND_COLOR }}
            >
              سياسة الخصوصية
            </Link>
            .
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-2">
          <button
            onClick={handleRejectOptional}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 transition-all hover:bg-gray-50"
          >
            الضرورية فقط
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            قبول الكل
          </button>
        </div>
      </div>
    </div>
  );
}
