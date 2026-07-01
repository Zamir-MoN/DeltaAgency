"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useGameMode } from "@/context/GameModeContext";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { isGameMode } = useGameMode();

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    setLenis(l);

    function raf(time: number) {
      l.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      l.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (isGameMode) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isGameMode, lenis]);

  return <>{children}</>;
}
