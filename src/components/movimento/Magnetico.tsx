"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/** Envolve um CTA e o faz "puxar" levemente em direção ao cursor (só desktop). */
export default function Magnetico({
  children,
  forca = 0.3,
  className = "",
}: {
  children: ReactNode;
  forca?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.ponteiroFino, () => {
        const el = ref.current!;
        const alvo = el.firstElementChild as HTMLElement;
        const xTo = gsap.quickTo(alvo, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(alvo, "y", { duration: 0.5, ease: "power3.out" });
        const mover = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * forca);
          yTo((e.clientY - (r.top + r.height / 2)) * forca);
        };
        const sair = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", mover);
        el.addEventListener("pointerleave", sair);
        return () => {
          el.removeEventListener("pointermove", mover);
          el.removeEventListener("pointerleave", sair);
        };
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`inline-flex p-2 -m-2 ${className}`}>
      {children}
    </span>
  );
}
