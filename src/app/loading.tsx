export const runtime = 'edge';

import { BRAND_COLOR } from "@/lib/constants";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div
          className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin mx-auto"
          style={{ borderTopColor: BRAND_COLOR }}
          role="status"
          aria-label="جاري التحميل"
        />
        <p className="mt-4 text-gray-500 text-sm">جاري التحميل...</p>
      </div>
    </div>
  );
}
