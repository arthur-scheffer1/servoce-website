"use client";

import { useRef } from "react";
import { faq } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { ScrollTrigger, gsap, useGSAP, MQ } from "@/lib/gsap";
import { Ph } from "../Ph";
import Desabrochar from "../movimento/Desabrochar";
import { Flor, Ramo, IconeWhatsApp } from "../ilustracoes";

export default function Duvidas() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-pergunta]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-perguntas]", start: "top 82%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="duvidas" ref={ref} data-fundo="#eef7fe" aria-labelledby="titulo-duvidas" className="secao">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3">
            <Desabrochar className="w-11">
              <Flor className="w-full text-marca" />
            </Desabrochar>
            <p className="sobretitulo">dúvidas</p>
            <div data-pouso className="h-1 w-6 self-end" />
          </div>
          <h2 id="titulo-duvidas" className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
            {faq.titulo}
          </h2>
          <p className="mt-4 text-lg text-suave">
            Não encontrou o que procurava? Pergunte direto pra gente. Nenhuma dúvida é pequena demais.
          </p>
          <a
            href={whatsLink("Olá! Tenho uma dúvida antes de agendar.")}
            target="_blank"
            rel="noopener"
            className="btn btn-primario mt-7"
          >
            <IconeWhatsApp className="h-5 w-5" />
            Tirar uma dúvida
          </a>
          <Desabrochar className="mt-10 hidden w-28 text-marca lg:block">
            <Ramo className="w-full" />
          </Desabrochar>
        </div>

        <div data-perguntas className="flex flex-col gap-3">
          {faq.itens.map((f, i) => (
            <details
              key={i}
              data-pergunta
              name="faq"
              onToggle={() => ScrollTrigger.refresh()}
              className="group rounded-[1.5rem] bg-white ring-1 ring-ceu transition-shadow duration-300 open:shadow-[0_20px_40px_-28px_rgb(11_111_174_/_0.6)] open:ring-marca/60"
            >
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 px-6 py-4 text-lg font-extrabold">
                {f.pergunta}
                <span
                  aria-hidden
                  className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-nevoa text-marca-forte transition-all duration-300 group-open:rotate-45 group-open:bg-marca-forte group-open:text-white"
                >
                  <span className="absolute h-0.5 w-4 rounded bg-current" />
                  <span className="absolute h-4 w-0.5 rounded bg-current" />
                </span>
              </summary>
              <div className="px-6 pb-6 text-suave [animation:abrir_.45s_cubic-bezier(.22,1,.36,1)]">
                <p>
                  <Ph>{f.resposta}</Ph>
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
      <style>{`@keyframes abrir{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}`}</style>
    </section>
  );
}
