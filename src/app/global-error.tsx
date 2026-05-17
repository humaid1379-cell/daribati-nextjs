"use client";

export const runtime = 'edge';

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased bg-white text-gray-900">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              حدث خطأ في التطبيق
            </h1>
            <p className="text-gray-600 mb-6">
              نعتذر عن هذا الخطأ غير المتوقع. يرجى المحاولة مرة أخرى.
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 rounded-lg text-white font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: "#1e3a5f" }}
            >
              حاول مرة أخرى
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
