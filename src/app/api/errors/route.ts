import { NextRequest, NextResponse } from "next/server";
import { logError, getErrors, getErrorStats } from "@/lib/error-tracker";

export const dynamic = "force-dynamic";

// POST: Report a new error from the client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    logError(body.message || "Unknown client error", {
      url: body.url || request.url,
      method: "CLIENT",
      userAgent: body.userAgent || request.headers.get("user-agent") || "N/A",
      type: "client-error",
    });

    return NextResponse.json(
      { status: "ok", message: "Error logged" },
      { status: 200 }
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    return NextResponse.json(
      { error: "Failed to process error report" },
      { status: 400 }
    );
  }
}

// GET: Retrieve errors or stats (protected by API key)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Simple API key protection
  const apiKey = process.env.ERROR_API_KEY || "daribati-error-key-2024";
  if (key !== apiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const view = searchParams.get("view");

  if (view === "stats") {
    return NextResponse.json({
      status: "ok",
      stats: getErrorStats(),
      timestamp: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    status: "ok",
    count: getErrors().length,
    errors: getErrors(),
    timestamp: new Date().toISOString(),
  });
}
