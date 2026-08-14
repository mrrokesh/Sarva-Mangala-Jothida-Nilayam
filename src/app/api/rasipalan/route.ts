import { NextResponse } from "next/server";
import { RASIS } from "@/lib/rasis";
import { PERIODS, type PeriodType } from "@/lib/rasipalan";
import { getLiveRasipalan } from "@/lib/liveRasipalan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rasi = url.searchParams.get("rasi") || "mesham";
  const period = (url.searchParams.get("period") || "daily") as PeriodType;
  if (!RASIS.some((r) => r.id === rasi) || !PERIODS.includes(period)) {
    return NextResponse.json({ error: "invalid rasi or period" }, { status: 400 });
  }
  const data = await getLiveRasipalan(rasi, period);
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": period === "daily" ? "public, s-maxage=1800, stale-while-revalidate=3600" : "public, s-maxage=7200, stale-while-revalidate=86400",
    },
  });
}
