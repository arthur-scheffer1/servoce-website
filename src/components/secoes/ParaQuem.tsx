"use client";

import { useRef } from "react";
import { perfis, nomeEspecialidade } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Flor, Florzinha, Borboleta, IconeSeta, IconeWhatsApp } from "../ilustracoes";
import Magnetico from "../movimento/Magnetico";

const icones = {
  mim: (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="24" cy="16" r="7" />
      <path d="M10 41c1.5-8 7-12 14-12s12.5 4 14 12" />
    </svg>
  ),
  casal: (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="17" cy="17" r="6" />
      <circle cx="32" cy="17" r="6" />
      <path d="M5 40c1-7 6-11 12-11 3 0 5.6 1 7.5 2.7M24 40c1-7 6-11 8-11 6 0 11 4 12 11" />
    </svg>
  ),
  filho: (
    <svg
      viewBox="0 0 48 48"
      className="h-9 w-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="17" cy="14" r="6" />
      <circle cx="33" cy="22" r="4.5" />
      <path d="M5 41c1-8 6-13 12-13s9 3 10.5 7M26 41c.8-5 3.6-8 7-8s6.2 3 7 8" />
    </svg>
  ),
};

export default function ParaQuem() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-faixa]", {
          clipPath: "inset(12% 6% 12% 6% round 48px)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-faixa]", start: "top 80%", once: true },
        });
        gsap.from("[data-perfil]", {
          y: 50,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-faixa]", start: "top 65%", once: true },
        });
        gsap.to("[data-faixa-deco]", {
          y: -120,
          rotate: 25,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="para-quem" ref={ref} data-fundo="#ffffff" aria-labelledby="titulo-perfis" className="py-10 sm:py-16">
      <div className="wrap">
        <div
          data-faixa
          className="relative isolate overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-marca-forte via-[#0d7cc2] to-marca-escura px-6 py-14 text-white sm:px-10 lg:px-14 lg:py-20"
          style={{ clipPath: "inset(0% 0% 0% 0% round 40px)" }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div data-faixa-deco className="absolute -right-10 -top-10 w-56 opacity-25">
              <Flor className="w-full" cor="#fff" />
            </div>
            <div data-faixa-deco className="absolute -bottom-12 left-[8%] w-40 opacity-15">
              <Flor className="w-full" cor="#fff" preenchida />
            </div>
            <Borboleta className="absolute right-[22%] top-10 hidden w-14 text-white/40 md:block" />
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <p className="font-manuscrita text-3xl text-sol">para quem é</p>
              <div data-pouso className="h-1 w-6 self-end" />
            </div>
            <h2 id="titulo-perfis" className="mt-2 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
              {perfis.titulo}
            </h2>
            <p className="mt-3 text-lg text-white/85">{perfis.intro}</p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {perfis.itens.map((p) => (
              <li
                key={p.id}
                data-perfil
                className="group flex flex-col rounded-[1.75rem] bg-white/10 p-6 ring-1 ring-white/25 backdrop-blur-sm transition-[translate,background-color] duration-300 hover:-translate-y-1.5 hover:bg-white/15"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-marca-forte transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                  {icones[p.id]}
                </span>
                <h3 className="mt-5 text-2xl font-black">{p.titulo}</h3>
                <p className="mt-2 text-white/85">{p.texto}</p>
                <ul className="mt-5 flex flex-col gap-2">
                  {p.especialidades.map((id) => (
                    <li key={id}>
                      <a
                        href={`#esp-${id}`}
                        className="group/link inline-flex min-h-11 items-center gap-2 font-bold text-white"
                      >
                        <Florzinha className="h-4 w-4 shrink-0" cor="#fff" />
                        <span className="link-linha">{nomeEspecialidade(id)}</span>
                        <IconeSeta className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Magnetico>
              <a href={whatsLink()} target="_blank" rel="noopener" className="btn btn-claro">
                <IconeWhatsApp className="h-5 w-5 text-[#128c4a]" />
                Conversar pelo WhatsApp
              </a>
            </Magnetico>
            <p className="text-white/85">Não sabe por onde começar? A gente te ajuda a escolher.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
