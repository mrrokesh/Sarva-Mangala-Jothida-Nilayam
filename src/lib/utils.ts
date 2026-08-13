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
  const d = phone.replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 5)} ${d.slice(5)}`;
  return phone;
}
