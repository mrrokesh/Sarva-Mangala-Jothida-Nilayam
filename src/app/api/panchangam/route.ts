import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { getPanchangam } from "@/lib/panchangam";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  const data = await unstable_cache(getPanchangam, ["panchangam-salem", day], { revalidate: 1800 })();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
  });
}
