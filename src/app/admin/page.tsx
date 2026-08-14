"use client";

import { useEffect, useState } from "react";
import { RASIS } from "@/lib/rasis";
import type { SiteContent } from "@/lib/cms";
import { PERIODS, type PeriodType } from "@/lib/rasipalan";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [consults, setConsults] = useState<unknown[]>([]);
  const [rasi, setRasi] = useState("mesham");
  const [period, setPeriod] = useState<PeriodType>("daily");
  const [msg, setMsg] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin", { method: "POST", body: JSON.stringify({ password }), headers: { "Content-Type": "application/json" } });
    if (res.ok) {
      setAuthed(true);
      load();
    } else setMsg("Wrong password");
  }

  async function load() {
    const [c, a] = await Promise.all([fetch("/api/content").then((r) => r.json()), fetch("/api/admin").then((r) => r.json())]);
    setContent(c);
    setConsults(a.consultations || []);
  }

  async function save() {
    if (!content) return;
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-key": password || "session" },
      body: JSON.stringify(content),
    });
    setMsg(res.ok ? "Saved" : "Save failed — re-enter password");
  }

  useEffect(() => {
    fetch("/api/admin").then((r) => {
      if (r.ok) {
        setAuthed(true);
        load();
      }
    });
  }, []);

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <form onSubmit={login} className="card-metal w-full max-w-sm space-y-4 rounded-3xl p-6">
          <h1 className="text-gold-bright">Admin</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-gold/30 bg-ink px-3 py-2" placeholder="Password" />
          <button className="gold-btn w-full rounded-full py-2">Enter</button>
          {msg && <p className="text-sm text-kumkum">{msg}</p>}
        </form>
      </div>
    );
  }

  const entry = content?.rasipalan[rasi]?.[period];
  const field = (key: keyof NonNullable<typeof entry>, lang: "ta" | "en") => (
    <textarea
      className="h-20 w-full rounded-xl border border-gold/20 bg-ink/60 p-2 text-sm"
      value={entry?.[key][lang] || ""}
      onChange={(e) => {
        if (!content || !entry) return;
        const next = structuredClone(content);
        next.rasipalan[rasi][period][key][lang] = e.target.value;
        setContent(next);
      }}
    />
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 pt-24 pb-16 sm:pt-28">
      <h1 className="tamil-serif text-3xl text-gold-bright">நிர்வாகம் / Admin</h1>
      {msg && <p className="text-cyan">{msg}</p>}
      {content && (
        <>
          <section className="card-metal rounded-3xl p-5 space-y-3">
            <h2 className="text-gold-bright">Profile & social</h2>
            <label className="block text-xs">Intro Tamil</label>
            <textarea className="h-24 w-full rounded-xl bg-ink/60 p-2 text-sm" value={content.profile.introTa} onChange={(e) => setContent({ ...content, profile: { ...content.profile, introTa: e.target.value } })} />
            <label className="block text-xs">Intro English</label>
            <textarea className="h-24 w-full rounded-xl bg-ink/60 p-2 text-sm" value={content.profile.introEn} onChange={(e) => setContent({ ...content, profile: { ...content.profile, introEn: e.target.value } })} />
            <div className="grid gap-3 sm:grid-cols-3">
              <input placeholder="Instagram URL" className="rounded-xl bg-ink/60 p-2 text-sm" value={content.profile.instagram} onChange={(e) => setContent({ ...content, profile: { ...content.profile, instagram: e.target.value } })} />
              <input placeholder="Facebook URL" className="rounded-xl bg-ink/60 p-2 text-sm" value={content.profile.facebook} onChange={(e) => setContent({ ...content, profile: { ...content.profile, facebook: e.target.value } })} />
              <input placeholder="YouTube URL" className="rounded-xl bg-ink/60 p-2 text-sm" value={content.profile.youtube} onChange={(e) => setContent({ ...content, profile: { ...content.profile, youtube: e.target.value } })} />
            </div>
          </section>
          <section className="card-metal rounded-3xl p-5 space-y-3">
            <h2 className="text-gold-bright">Rasipalan CMS (fallback only)</h2>
            <p className="text-xs text-ivory/60">
              The public page loads live daily / weekly / monthly / yearly rasipalan from a free horoscope API. These CMS fields are used only if that live feed is unavailable.
            </p>
            <div className="flex flex-wrap gap-2">
              {RASIS.map((r) => (
                <button key={r.id} onClick={() => setRasi(r.id)} className={`rounded-full px-3 py-1 text-xs ${rasi === r.id ? "bg-gold text-ink" : "border border-gold/30"}`}>
                  {r.ta}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {PERIODS.map((p) => (
                <button key={p} onClick={() => setPeriod(p)} className={`rounded-full px-3 py-1 text-xs ${period === p ? "bg-cyan text-ink" : "border border-cyan/30"}`}>
                  {p}
                </button>
              ))}
            </div>
            {entry && (
              <div className="grid gap-3 md:grid-cols-2">
                {(["general", "career", "finance", "family", "marriage", "health", "luckyColor", "luckyNumber", "auspiciousTime"] as const).map((k) => (
                  <div key={k}>
                    <p className="text-xs text-cyan">{k} · TA</p>
                    {field(k, "ta")}
                    <p className="text-xs text-cyan">EN</p>
                    {field(k, "en")}
                  </div>
                ))}
              </div>
            )}
          </section>
          <button onClick={save} className="gold-btn rounded-full px-6 py-2">Save content</button>
        </>
      )}
      <section className="card-metal rounded-3xl p-5">
        <h2 className="text-gold-bright">Consultations → Vibeo inbox log</h2>
        <div className="mt-3 space-y-3 text-sm">
          {(consults as { id: string; name: string; mobile: string; createdAt: string; consultationType?: string; matching?: { bride?: { name?: string }; groom?: { name?: string } } }[]).map((c) => (
            <div key={c.id} className="rounded-xl border border-gold/15 p-3">
              <p className="text-gold-bright">{c.name} · {c.mobile}</p>
              <p className="text-ivory/60">{c.consultationType} · {c.createdAt}</p>
              {c.matching?.bride?.name && (
                <p className="text-ivory/70">
                  {c.matching.bride.name} · {c.matching.groom?.name}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
