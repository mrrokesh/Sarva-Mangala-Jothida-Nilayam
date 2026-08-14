"use client";

import { useEffect } from "react";

export default function RasisRedirect() {
  useEffect(() => {
    window.location.replace("/rasipalan#rasis");
  }, []);
  return null;
}
