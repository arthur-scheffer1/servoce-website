"use client";

import { useRef } from "react";
import { comoFunciona } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Flor, IconeWhatsApp } from "../ilustracoes";
import Magnetico from "../movimento/Magnetico";

/**
 * Tablet/desktop: seção pinada; os 3 passos acendem conforme a rolagem
 * e um caule cresce ligando-os, terminando numa flor que desabrocha.
 * Celular: lista simples com o caule crescendo junto da rolagem (sem pin).
 * Movimento reduzido: tudo visível, sem animação.
 */
export default function ComoFunciona() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.tablet, () => {
        const passos = gsap.utils.toArray<HTMLElement>("[data-passo]");
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        tl.fromTo("[data-caule-h]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 3 }, 0);
        passos.forEach((p, i) => {
          const t = i * 1.05;
          tl.fromTo(p, { autoAlpha: 0.25, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, t)
            .fromTo(
              p.querySelector("[data-no]"),
              { scale: 0.4, backgroundColor: "#ffffff" },
              { scale: 1, backgroundColor: "#0b6fae", duration: 0.4, ease: "back.out(2)" },
              t + 0.1,
            )
            .fromTo(p.querySelector("[data-num]"), { color: "#0b6fae" }, { color: "#ffffff", duration: 0.2 }, t + 0.2);
        });
        tl.fromTo(
          "[data-flor-final] .petala",
          { strokeDasharray: 1, strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.6, stagger: 0.05 },
          2.6,
        )
          .fromTo(
            "[data-flor-final]",
            { scale: 0.3, rotate: -60, autoAlpha: 0 },
            { scale: 1, rotate: 0, autoAlpha: 1, duration: 0.8, ease: "back.out(1.6)" },
            2.5,
          )
          .from("[data-final]", { autoAlpha: 0, y: 20, duration: 0.4 }, 3.0)
          .to({}, { duration: 0.4 });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-caule-v]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { trigger: "[data-passos]", start: "top 70%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-passo]").forEach((p) => {
          gsap.from(p, {
            autoAlpha: 0.2,
            x: 20,
            duration: 0.7,
            scrollTrigger: { trigger: p, start: "top 75%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="como-funciona"
      ref={ref}
      data-fundo="#fbfaf6"
      aria-labelledby="titulo-como"
      className="relative flex min-h-[100svh] items-center overflow-hidden py-24 md:py-16"
    >
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <p className="sobretitulo">como funciona</p>
            <div data-pouso className="h-1 w-6 self-end" />
          </div>
          <h2 id="titulo-como" className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
            {comoFunciona.titulo}
          </h2>
          <p className="mt-4 text-lg text-suave">{comoFunciona.intro}</p>
        </div>

        <div className="relative mt-14 md:mt-20">
          {/* caule horizontal (tablet/desktop) */}
          <svg
            aria-hidden
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[30px] hidden h-[60px] w-[66.66%] -translate-y-1/2 md:block"
          >
            <path
              data-caule-h
              d="M0 30 C 160 -10, 340 70, 500 30 S 840 -10, 1000 30"
              fill="none"
              stroke="var(--color-marca)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          {/* caule vertical (celular) */}
          <svg
            aria-hidden
            viewBox="0 0 20 1000"
            preserveAspectRatio="none"
            className="pointer-events-none absolute bottom-10 left-[29px] top-6 w-5 md:hidden"
          >
            <path
              data-caule-v
              d="M10 0 C 0 250, 20 500, 10 1000"
              fill="none"
              stroke="var(--color-marca)"
              strokeWidth="3"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol data-passos className="relative grid gap-10 md:grid-cols-3 md:gap-8">
            {comoFunciona.passos.map((p, i) => (
              <li key={p.titulo} data-passo className="relative flex gap-5 md:flex-col md:items-center md:text-center">
                <span
                  data-no
                  className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-marca-forte shadow-[0_0_0_8px_var(--color-creme)] ring-2 ring-marca-forte"
                >
                  <span data-num className="text-2xl font-black text-white">
                    {i + 1}
                  </span>
                </span>
                <div className="md:mt-6">
                  <h3 className="text-xl font-black sm:text-2xl">{p.titulo}</h3>
                  <p className="mt-2 text-suave md:mx-auto md:max-w-xs">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <div data-flor-final aria-hidden className="w-16 text-marca">
            <Flor className="w-full" />
          </div>
          <div data-final className="flex flex-col items-center gap-3">
            <Magnetico>
              <a href={whatsLink()} target="_blank" rel="noopener" className="btn btn-primario">
                <IconeWhatsApp className="h-5 w-5" />
                Dar o primeiro passo
              </a>
            </Magnetico>
            <p className="text-sm text-suave">A primeira conversa é sem compromisso.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
