"use client";

import { useRef } from "react";
import { sobre } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import FotoPlaceholder from "../FotoPlaceholder";
import Desabrochar from "../movimento/Desabrochar";
import { Flor, Ramo, IconeValor, IconeWhatsApp } from "../ilustracoes";

export default function Sobre() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Contadores (o número final já está no HTML; a animação só conta até ele)
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.utils.toArray<HTMLElement>("[data-contador]").forEach((el) => {
          const fim = parseInt(el.dataset.contador!);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: fim,
            duration: 1.6 + fim * 0.1,
            ease: "power2.out",
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.from("[data-valor]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-valores]", start: "top 85%", once: true },
        });
        gsap.to("[data-sobre-foto]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="sobre" ref={ref} data-fundo="#fbfaf6" aria-labelledby="titulo-sobre" className="secao">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div data-sobre-foto>
            <FotoPlaceholder rotulo="sala de atendimento" forma="card" className="aspect-[4/5] w-full rounded-[2rem]" />
          </div>
          <Desabrochar className="absolute -bottom-8 -right-4 w-24 text-marca sm:w-28">
            <Ramo className="w-full" />
          </Desabrochar>
          <p className="absolute -left-2 bottom-10 rotate-[-4deg] rounded-2xl bg-white px-5 py-3 font-manuscrita text-3xl text-marca-forte shadow-[0_14px_30px_-16px_rgb(23_50_74_/_0.5)] sm:-left-6 sm:text-4xl">
            {sobre.fraseManuscrita}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <p className="sobretitulo">sobre a clínica</p>
            <div data-pouso className="h-1 w-6 self-end" />
          </div>
          <h2 id="titulo-sobre" className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.6rem]">
            {sobre.titulo}
          </h2>
          {sobre.paragrafos.map((p, i) => (
            <p key={i} className="mt-4 text-lg text-suave">
              {p}
            </p>
          ))}

          <dl className="mt-9 grid grid-cols-3 gap-3 border-y border-ceu py-6 sm:gap-6">
            {sobre.numeros.map((n) => (
              <div key={n.rotulo} className="flex flex-col-reverse">
                <dt className="mt-1 text-[0.82rem] font-semibold leading-snug text-suave sm:text-sm">{n.rotulo}</dt>
                <dd className="text-5xl font-black leading-none text-marca-forte sm:text-6xl">
                  <span data-contador={n.valor}>{n.valor}</span>
                  {n.sufixo}
                </dd>
              </div>
            ))}
          </dl>

          <ul data-valores className="mt-8 grid gap-4 sm:grid-cols-3">
            {sobre.valores.map((v) => (
              <li key={v.titulo} data-valor className="rounded-[1.5rem] bg-white p-5 ring-1 ring-ceu">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-nevoa text-marca-forte">
                  <IconeValor tipo={v.icone} className="h-8 w-8" />
                </span>
                <h3 className="mt-3 text-lg font-extrabold">{v.titulo}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-suave">{v.texto}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={whatsLink("Olá! Tenho uma dúvida sobre os atendimentos da Ser Você.")}
              target="_blank"
              rel="noopener"
              className="btn btn-secundario"
            >
              <IconeWhatsApp className="h-5 w-5" />
              Tirar uma dúvida
            </a>
            <Flor aria-hidden className="balanco hidden w-10 text-marca sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
