"use client";

import { useEffect } from "react";

export default function MouseGradient() {
  useEffect(() => {
    let raf = 0;

    const updateMouse = (event: MouseEvent) => {
      cancelAnimationFrame(raf);

      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--mouse-x",
          `${event.clientX}px`
        );
        document.documentElement.style.setProperty(
          "--mouse-y",
          `${event.clientY}px`
        );
      });
    };

    window.addEventListener("mousemove", updateMouse, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", updateMouse);
    };
  }, []);

  return null;
}