import { NextRequest, NextResponse } from "next/server";
import { saveConsultation } from "@/lib/cms";
import { sendToVibeo, formatVibeoMessage, vibeoChatUrl } from "@/lib/vibeo";
import { SITE } from "@/lib/site";
import { waLink } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const mobile = String(body.mobile || "").replace(/\D/g, "");
  if (!name || mobile.length < 10) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const row = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name,
    mobile,
    whatsapp: String(body.whatsapp || ""),
    email: String(body.email || ""),
    city: String(body.city || ""),
    country: String(body.country || "India"),
    dob: String(body.dob || ""),
    tob: String(body.tob || ""),
    pob: String(body.pob || ""),
    consultationType: String(body.consultationType || ""),
    consultationMode: String(body.consultationMode || ""),
    message: String(body.message || ""),
    matching: body.matching
      ? {
          bride: {
            name: String(body.matching?.bride?.name || ""),
            dob: String(body.matching?.bride?.dob || ""),
            tob: String(body.matching?.bride?.tob || ""),
            pob: String(body.matching?.bride?.pob || ""),
          },
          groom: {
            name: String(body.matching?.groom?.name || ""),
            dob: String(body.matching?.groom?.dob || ""),
            tob: String(body.matching?.groom?.tob || ""),
            pob: String(body.matching?.groom?.pob || ""),
          },
        }
      : undefined,
  };

  const vibeo = await sendToVibeo(row).catch((e) => ({ ok: false, skipped: false, reason: String(e) }));
  await saveConsultation({ ...row, vibeo });

  const text = formatVibeoMessage(row);
  return NextResponse.json({
    ok: true,
    vibeo,
    vibeoUrl: vibeoChatUrl(text),
    vibeoStore: SITE.vibeoPlayStore,
    whatsappUrl: waLink(SITE.whatsapp, text),
  });
}
