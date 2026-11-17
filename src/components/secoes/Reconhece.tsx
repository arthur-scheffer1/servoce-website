"use client";

import { useRef, useState } from "react";
import { reconhece, seletor, nomeEspecialidade, type PerfilId } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Flor, IconeWhatsApp, IconeSeta, Florzinha } from "../ilustracoes";
import Magnetico from "../movimento/Magnetico";
import Desabrochar from "../movimento/Desabrochar";

export default function Reconhece() {
  const ref = useRef<HTMLElement>(null);
  const resultado = useRef<HTMLDivElement>(null);
  const [perfil, setPerfil] = useState<PerfilId>("mim");
  const opcao = seletor.opcoes.find((o) => o.id === perfil)!;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-frase]", {
          y: 40,
          autoAlpha: 0,
          rotate: (i) => (i % 2 ? 2 : -2),
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-frases]", start: "top 80%", once: true },
        });
        gsap.from("[data-seletor]", {
          y: 60,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-seletor]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  const escolher = (id: PerfilId) => {
    if (id === perfil) return;
    setPerfil(id);
    if (resultado.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(
        resultado.current,
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out" },
      );
    }
  };

  return (
    <section id="reconhece" ref={ref} data-fundo="#eef7fe" aria-labelledby="titulo-reconhece" className="secao">
      <div className="wrap grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div>
          <div className="flex items-center gap-3">
            <Desabrochar className="w-12 shrink-0">
              <Flor className="w-full text-marca" />
            </Desabrochar>
            <p className="sobretitulo">antes de tudo…</p>
            <div data-pouso className="ml-1 h-1 w-6 self-end" />
          </div>
          <h2 id="titulo-reconhece" className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
            {reconhece.titulo}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-suave">{reconhece.intro}</p>

          <ul data-frases className="mt-9 grid gap-3.5 sm:grid-cols-2">
            {reconhece.frases.map((f, i) => (
              <li key={i} data-frase>
                <a
                  href={`#esp-${f.especialidade}`}
                  className="group relative flex h-full min-h-28 flex-col justify-between gap-3 rounded-[1.5rem] rounded-bl-md bg-white p-5 shadow-[0_10px_30px_-20px_rgb(23_50_74_/_0.45)] ring-1 ring-ceu transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgb(11_111_174_/_0.5)] hover:ring-marca"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-4 top-1 font-black text-6xl leading-none text-ceu transition-colors duration-300 group-hover:text-marca/40"
                  >
                    ”
                  </span>
                  <span className="relative pr-6 text-[1.05rem] font-bold leading-snug text-tinta">{f.texto}</span>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-marca-forte">
                    {nomeEspecialidade(f.especialidade)}
                    <IconeSeta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-2 font-bold text-tinta">
            <Florzinha className="h-5 w-5 shrink-0" cor="var(--color-marca)" />
            {reconhece.ajuda}
          </p>
        </div>

        {/* Microcompromisso: seletor */}
        <div className="lg:pt-24">
          <div
            data-seletor
            className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgb(11_111_174_/_0.45)] ring-1 ring-ceu sm:p-8 lg:sticky lg:top-28"
          >
            <Flor aria-hidden className="absolute -right-8 -top-8 w-32 text-ceu" />
            <h3 id="titulo-seletor" className="relative text-2xl font-black">
              {seletor.titulo}
            </h3>
            <div
              role="group"
              aria-labelledby="titulo-seletor"
              className="relative mt-5 grid grid-cols-3 gap-2 rounded-full bg-nevoa p-1.5"
            >
              {seletor.opcoes.map((o) => {
                const ativo = o.id === perfil;
                return (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={ativo}
                    onClick={() => escolher(o.id)}
                    className={`min-h-12 rounded-full px-2 text-[0.92rem] font-extrabold leading-tight transition-all duration-300 sm:text-base ${
                      ativo ? "bg-marca-forte text-white shadow-md" : "text-marca-escura hover:bg-white"
                    }`}
                  >
                    {o.rotulo}
                  </button>
                );
              })}
            </div>

            <div ref={resultado} aria-live="polite" className="relative mt-6">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">Indicado para começar</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {opcao.indicacao.map((id, i) => (
                  <li key={id}>
                    <a
                      href={`#esp-${id}`}
                      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors ${
                        i === 0 ? "bg-sol-claro text-tinta ring-1 ring-sol" : "bg-nevoa text-marca-escura hover:bg-ceu"
                      }`}
                    >
                      {i === 0 && <Florzinha className="h-4 w-4" cor="var(--color-marca)" />}
                      {nomeEspecialidade(id)}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-suave">{opcao.texto}</p>
              <Magnetico className="mt-6 w-full">
                <a href={whatsLink(opcao.mensagem)} target="_blank" rel="noopener" className="btn btn-primario w-full">
                  <IconeWhatsApp className="h-5 w-5" />
                  Conversar pelo WhatsApp
                </a>
              </Magnetico>
              <p className="mt-3 text-center text-sm text-suave">A mensagem já vai escrita. É só enviar.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
