import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readContent, writeContent } from "@/lib/cms";

function isAdmin(req: Request, cookieVal?: string) {
  const header = req.headers.get("x-admin-key");
  const pass = process.env.ADMIN_PASSWORD;
  return Boolean(pass && (header === pass || cookieVal === pass));
}

export async function GET() {
  const content = await readContent();
  return NextResponse.json(content);
}

export async function PUT(req: Request) {
  const jar = await cookies();
  if (!isAdmin(req, jar.get("sm-admin")?.value)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await writeContent(body);
  return NextResponse.json({ ok: true });
}
