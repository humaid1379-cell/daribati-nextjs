import { auth0 } from "@/lib/auth0";
import { BRAND_COLOR } from "@/lib/constants";

/**
 * Server Component: Renders login or logout button based on Auth0 session state.
 * This component is intentionally a Server Component so it can read the session
 * on the server without exposing auth state to the client bundle.
 */
export default async function AuthButton() {
  const session = await auth0.getSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user.picture && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.picture}
            alt={session.user.name ?? "المستخدم"}
            className="w-8 h-8 rounded-full border-2 hidden sm:block"
            style={{ borderColor: BRAND_COLOR }}
          />
        )}
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: BRAND_COLOR }}
        >
          لوحة التحكم
        </a>
        <a
          href="/auth/logout"
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200"
        >
          تسجيل الخروج
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/auth/login"
        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
      >
        تسجيل الدخول
      </a>
      <a
        href="/auth/login?screen_hint=signup"
        className="px-5 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{ backgroundColor: BRAND_COLOR }}
      >
        جرّب مجاناً
      </a>
    </div>
  );
}
