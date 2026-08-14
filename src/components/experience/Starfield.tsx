"use client";

import { useEffect, useRef } from "react";

export function Starfield({ density = 90 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const count = mobile ? Math.min(40, density) : density;

    let w = 0;
    let h = 0;
    const stars = Array.from({ length: count }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 1.4 + 0.2,
      a: Math.random(),
      s: Math.random() * 0.008 + 0.002,
    }));

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
      stars.forEach((st) => {
        st.x = Math.random() * w;
        st.y = Math.random() * h;
      });
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        if (!reduced) {
          st.a += st.s;
          if (st.a > 1 || st.a < 0.15) st.s *= -1;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(139, 74, 22, ${st.a * 0.45})`;
        ctx.arc(st.x, st.y, st.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
