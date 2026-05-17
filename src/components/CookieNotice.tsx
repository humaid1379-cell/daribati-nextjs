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
    localStorage.setItem("daribati_cookies_accepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6"
      role="dialog"
      aria-label="إشعار ملفات تعريف الارتباط"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed">
            نستخدم ملفات تعريف الارتباط الضرورية لتشغيل المنصة وتأمين جلستك، وملفات تحليلية لتحسين تجربتك.
            باستمرارك في التصفح، فإنك توافق على استخدامنا لملفات تعريف الارتباط وفقاً لـ{" "}
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
        <button
          onClick={handleAccept}
          className="flex-shrink-0 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: BRAND_COLOR }}
        >
          موافق
        </button>
      </div>
    </div>
  );
}
