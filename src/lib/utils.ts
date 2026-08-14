import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waLink(phone: string, text?: string) {
  const digits = phone.replace(/\D/g, "");
  const base = `https://wa.me/91${digits.replace(/^91/, "")}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telLink(phone: string) {
  return `tel:+91${phone.replace(/\D/g, "").replace(/^91/, "")}`;
}

export function formatPhone(phone: string) {
  const d = phone.replace(/\D/g, "").replace(/^91/, "");
  if (d.length === 10) return `+91 ${d.slice(0, 5)} ${d.slice(5)}`;
  return `+91 ${phone}`;
}

export function isNavActive(pathname: string, href: string) {
  const path = href.split("#")[0] || "/";
  if (path === "/") return pathname === "/";
  if (path === "/rasipalan") return pathname === "/rasipalan" || pathname === "/rasis" || pathname === "/nakshatras";
  if (path === "/about") return pathname === "/about" || pathname === "/gallery";
  return pathname === path || pathname.startsWith(`${path}/`);
}
