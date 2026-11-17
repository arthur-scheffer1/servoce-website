"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

/**
 * Faz as flores/ramos SVG dentro dele "desabrocharem" quando entram na tela:
 * o traço é desenhado (.petala, .caule, .folha) e o miolo cresce.
 */
export default function Desabrochar({
  children,
  className = "",
  atraso = 0,
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        const tracos = ref.current!.querySelectorAll(".caule, .folha, .petala");
        const miolos = ref.current!.querySelectorAll(".miolo, .botoes");
        const svgs = ref.current!.querySelectorAll("svg");
        const tl = gsap.timeline({
          delay: atraso,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        });
        tl.from(
          svgs,
          {
            scale: 0.6,
            rotation: -20,
            transformOrigin: "50% 60%",
            duration: 1.4,
            ease: "back.out(1.6)",
            stagger: 0.12,
          },
          0,
        )
          .fromTo(
            tracos,
            { strokeDasharray: 1, strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", stagger: 0.04 },
            0,
          )
          .from(
            miolos,
            { scale: 0, transformOrigin: "50% 50%", duration: 0.6, ease: "back.out(3)", stagger: 0.05 },
            0.7,
          );
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
