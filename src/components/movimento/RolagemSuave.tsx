"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefereMenosMovimento } from "@/lib/gsap";

let lenisGlobal: Lenis | null = null;

/** Rola até uma âncora usando Lenis (ou rolagem nativa se o movimento for reduzido). */
export function rolarPara(alvo: string) {
  const el = document.querySelector(alvo) as HTMLElement | null;
  if (!el) return;
  const header = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
  if (lenisGlobal) {
    lenisGlobal.scrollTo(el, { offset: -header + 1, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: prefereMenosMovimento() ? "auto" : "smooth" });
  }
  // move o foco para a seção (acessibilidade)
  el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  history.replaceState(null, "", alvo);
}

export default function RolagemSuave() {
  useEffect(() => {
    // Links âncora internos
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      e.preventDefault();
      rolarPara(href);
      window.dispatchEvent(new CustomEvent("servoce:navegou"));
    };
    document.addEventListener("click", onClick);

    if (prefereMenosMovimento()) {
      return () => document.removeEventListener("click", onClick);
    }

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenisGlobal = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisGlobal = null;
    };
  }, []);

  return null;
}
