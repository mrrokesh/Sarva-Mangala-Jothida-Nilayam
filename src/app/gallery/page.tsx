"use client";

import { useEffect } from "react";

export default function GalleryRedirect() {
  useEffect(() => {
    window.location.replace("/about#gallery");
  }, []);
  return null;
}
