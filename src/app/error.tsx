"use client";

export const runtime = 'edge';

import { useEffect } from "react";
import { BRAND_COLOR } from "@/lib/constants";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report error to the error tracking API
    fetch("/api/errors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }),
    }).catch(console.error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4" dir="rtl">
      <div className="text-center max-w-md">
        <div
          className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${BRAND_COLOR}15` }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke={BRAND_COLOR}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          حدث خطأ غير متوقع
        </h2>
        <p className="text-gray-600 mb-6">
          نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة
          الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: BRAND_COLOR }}
          >
            حاول مرة أخرى
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-semibold transition-all hover:bg-gray-50"
          >
            الصفحة الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
