import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { listConsultations } from "@/lib/cms";

export async function POST(req: Request) {
  const { password } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const jar = await cookies();
  jar.set("sm-admin", process.env.ADMIN_PASSWORD || "", { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const ok = jar.get("sm-admin")?.value === process.env.ADMIN_PASSWORD;
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });
  const consultations = await listConsultations();
  return NextResponse.json({ ok: true, consultations });
}
