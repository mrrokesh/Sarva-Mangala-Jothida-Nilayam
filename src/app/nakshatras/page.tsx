"use client";

import { useEffect } from "react";

export default function NakshatrasRedirect() {
  useEffect(() => {
    window.location.replace("/rasipalan#nakshatras");
  }, []);
  return null;
}
