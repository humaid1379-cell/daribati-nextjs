import { NextResponse } from "next/server";

export const runtime = 'edge';
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "daribati.ae",
      version: "3.0.0-nextjs",
      runtime: "Next.js SSR",
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0",
      },
    }
  );
}
