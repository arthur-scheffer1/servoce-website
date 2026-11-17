"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Barra de progresso de leitura + transição suave da cor de fundo.
 * Cada <section data-fundo="#hex"> define a cor do fundo quando está no centro da tela.
 */
export default function Ambiente() {
  const barra = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barra.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: 0.3 },
    });

    const secoes = gsap.utils.toArray<HTMLElement>("[data-fundo]");
    secoes.forEach((s) => {
      ScrollTrigger.create({
        trigger: s,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (self.isActive) document.body.style.setProperty("--bg-pagina", s.dataset.fundo!);
        },
      });
    });
  });

  return (
    <div
      ref={barra}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0 bg-gradient-to-r from-marca to-marca-forte"
    />
  );
}
