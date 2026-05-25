"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND_COLOR } from "@/lib/constants";

export default function Header({
  authSlot,
}: {
  authSlot?: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="التنقل الرئيسي"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="ضريبتي - الصفحة الرئيسية"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="ضريبتي — Daribati"
              height={40}
              style={{ height: "40px", width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#0A2647]/10 text-[#0A2647]"
                    : "text-gray-600 hover:text-[#0A2647] hover:bg-gray-50"
                }`}
              >
                {link.labelAr}
              </Link>
            ))}
          </div>

          {/* Auth Slot: login/logout buttons injected from server layout */}
          <div className="hidden md:flex items-center gap-2">
            {authSlot ?? (
              <Link
                href="/dashboard"
                className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                لوحة التحكم
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-1 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-[#0A2647]/10 text-[#0A2647]"
                      : "text-gray-600 hover:text-[#0A2647] hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.labelAr}
                </Link>
              ))}
              {/* Mobile auth links */}
              <div className="mx-4 mt-2 flex flex-col gap-2">
                <a
                  href="/auth/login"
                  className="px-5 py-3 rounded-lg text-sm font-medium text-gray-700 text-center border border-gray-200 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  تسجيل الدخول
                </a>
                <a
                  href="/auth/login?screen_hint=signup"
                  className="px-5 py-3 rounded-lg text-sm font-semibold text-white text-center transition-all hover:opacity-90"
                  style={{ backgroundColor: BRAND_COLOR }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  جرّب مجاناً 14 يوماً
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
