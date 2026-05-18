import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";
import type { Metadata } from "next";
import { BRAND_COLOR, SITE_NAME_AR } from "@/lib/constants";

export const runtime = 'edge';

export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "لوحة تحكم ضريبتي — إدارة الضرائب والفواتير",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login?returnTo=/dashboard");
  }

  const { user } = session;

  return (
    <div
      className="min-h-screen bg-gray-50"
      dir="rtl"
      lang="ar"
    >
      {/* Dashboard Header */}
      <header
        className="shadow-sm"
        style={{ backgroundColor: BRAND_COLOR }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-white text-2xl font-bold">{SITE_NAME_AR}</span>
            <span className="text-blue-200 text-sm font-medium">لوحة التحكم</span>
          </div>
          <div className="flex items-center gap-4">
            {user.picture && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.picture}
                alt={user.name ?? "صورة المستخدم"}
                className="w-9 h-9 rounded-full border-2 border-white/30"
              />
            )}
            <span className="text-white text-sm hidden sm:block">
              {user.name ?? user.email}
            </span>
            <a
              href="/auth/logout"
              className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg border border-white/20"
            >
              تسجيل الخروج
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        <div
          className="rounded-2xl p-6 mb-8 text-white"
          style={{
            background: `linear-gradient(135deg, ${BRAND_COLOR} 0%, #2a5a8f 100%)`,
          }}
        >
          <h1 className="text-2xl font-bold mb-1">
            مرحباً، {user.name ?? user.email} 👋
          </h1>
          <p className="text-blue-100 text-sm">
            مرحباً بك في لوحة تحكم ضريبتي. نعمل على إطلاق جميع الميزات قريباً.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "الفواتير هذا الشهر",
              value: "٠",
              icon: "🧾",
              color: "bg-blue-50 border-blue-100",
              textColor: "text-blue-700",
            },
            {
              label: "ضريبة القيمة المضافة المستحقة",
              value: "٠ د.إ",
              icon: "📊",
              color: "bg-green-50 border-green-100",
              textColor: "text-green-700",
            },
            {
              label: "ضريبة الشركات",
              value: "٠ د.إ",
              icon: "🏢",
              color: "bg-purple-50 border-purple-100",
              textColor: "text-purple-700",
            },
            {
              label: "التقارير المعلقة",
              value: "٠",
              icon: "📋",
              color: "bg-orange-50 border-orange-100",
              textColor: "text-orange-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-xl border p-5 ${stat.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-2xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            الإجراءات السريعة
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "إنشاء فاتورة", icon: "➕" },
              { label: "استيراد CSV", icon: "📤" },
              { label: "تقرير ضريبي", icon: "📈" },
              { label: "الإعدادات", icon: "⚙️" },
            ].map((action) => (
              <div
                key={action.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 opacity-60 cursor-not-allowed"
                aria-disabled="true"
                title="قريباً"
              >
                <span className="text-2xl">
                  {action.icon}
                </span>
                <span className="text-sm font-medium text-gray-700 text-center">
                  {action.label}
                </span>
                <span className="text-xs text-gray-400">قريباً</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            معلومات الحساب
          </h2>
          <div className="flex items-center gap-4">
            {user.picture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.picture}
                alt={user.name ?? "صورة المستخدم"}
                className="w-16 h-16 rounded-full border-2"
                style={{ borderColor: BRAND_COLOR }}
              />
            ) : (
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: BRAND_COLOR }}
              >
                {(user.name ?? user.email ?? "م")[0].toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900 text-lg">
                {user.name ?? "مستخدم"}
              </p>
              <p className="text-gray-500 text-sm">{user.email}</p>
              {user.email_verified && (
                <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                  ✓ البريد الإلكتروني موثق
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
