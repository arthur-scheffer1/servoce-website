"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Borboleta } from "../ilustracoes";

const LARG = 58;
const ALT = LARG * 0.8;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (t: number) => t * t * (3 - 2 * t);

/**
 * Borboleta que acompanha a rolagem e pousa nos elementos [data-pouso] de cada seção.
 * Só no desktop e sem "reduzir movimento".
 */
export default function BorboletaGuia() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.desktop, () => {
      const el = ref.current!;
      const svg = el.querySelector("svg")!;
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power2.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power2.out" });
      const rTo = gsap.quickTo(svg, "rotation", { duration: 0.6, ease: "power2.out" });

      gsap.fromTo(
        el,
        { autoAlpha: 0, scale: 0.4 },
        { autoAlpha: 1, scale: 1, duration: 1.2, delay: 1.6, ease: "back.out(2)" },
      );

      let ultimoX = 0;
      let voando = false;

      const quadro = (time: number) => {
        const pousos = Array.from(document.querySelectorAll<HTMLElement>("[data-pouso]"));
        if (!pousos.length) return;
        const vh = window.innerHeight;
        const linha = vh * 0.45;
        const pts = pousos.map((p) => {
          const r = p.getBoundingClientRect();
          return { x: r.left + r.width / 2 - LARG / 2, y: r.top - ALT * 0.62, topo: r.top };
        });

        let i = 0;
        while (i < pts.length - 1 && pts[i + 1].topo <= linha) i++;
        const a = pts[i];
        const b = pts[Math.min(i + 1, pts.length - 1)];
        let t = 0;
        if (b !== a && a.topo <= linha) t = clamp((linha - a.topo) / (b.topo - a.topo));
        const tv = suave(clamp((t - 0.3) / 0.55));

        let x = a.x + (b.x - a.x) * tv;
        let y = a.y + (b.y - a.y) * tv;
        const emVoo = tv > 0.001 && tv < 0.999;
        if (emVoo) {
          y -= Math.sin(Math.PI * tv) * vh * 0.14;
          x += Math.sin(time * 3.2) * 10;
          y += Math.cos(time * 4.1) * 6;
        }
        y = clamp(y, 84, vh - ALT - 20);
        x = clamp(x, 12, window.innerWidth - LARG - 12);

        xTo(x);
        yTo(y);
        rTo(clamp((x - ultimoX) * 0.9, -25, 25));
        ultimoX = x;

        if (emVoo !== voando) {
          voando = emVoo;
          el.style.setProperty("--asa-vel", emVoo ? "0.28s" : "1.8s");
        }
      };

      gsap.ticker.add(quadro);
      return () => gsap.ticker.remove(quadro);
    });
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden opacity-0 lg:block"
      style={{ width: LARG, height: ALT, ["--asa-vel" as string]: "1.8s" }}
    >
      <Borboleta className="h-full w-full text-marca drop-shadow-[0_6px_10px_rgb(46_170_245_/_0.35)]" preenchida />
    </div>
  );
}
