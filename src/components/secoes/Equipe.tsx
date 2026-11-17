"use client";

import { useRef } from "react";
import { equipe } from "@/content/clinica";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import FotoPlaceholder from "../FotoPlaceholder";
import Desabrochar from "../movimento/Desabrochar";
import { Ph } from "../Ph";
import { Flor } from "../ilustracoes";

export default function Equipe() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-pessoa]", {
          y: 70,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-pessoas]", start: "top 82%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="equipe" ref={ref} data-fundo="#eef7fe" aria-labelledby="titulo-equipe" className="secao">
      <div className="wrap">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <Desabrochar className="w-11">
                <Flor className="w-full text-marca" />
              </Desabrochar>
              <p className="sobretitulo">equipe</p>
              <div data-pouso className="h-1 w-6 self-end" />
            </div>
            <h2 id="titulo-equipe" className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]">
              {equipe.titulo}
            </h2>
            <p className="mt-4 text-lg text-suave">{equipe.intro}</p>
          </div>
          <p className="inline-flex items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-extrabold text-marca-forte ring-1 ring-ceu lg:self-end">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden
            >
              <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6l-8-3Z" strokeLinejoin="round" />
              <path d="m8.5 12 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Todas com registro ativo no Conselho
          </p>
        </div>

        <ul data-pessoas className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {equipe.pessoas.map((p, i) => (
            <li key={i} data-pessoa>
              <article className="group flex h-full flex-col rounded-[var(--radius-card)] bg-white p-4 pb-6 shadow-[0_20px_50px_-35px_rgb(23_50_74_/_0.6)] ring-1 ring-ceu transition-transform duration-500 hover:-translate-y-1.5">
                <div className="overflow-hidden rounded-t-[999px] rounded-b-[1.25rem]">
                  <div className="transition-transform duration-700 ease-[var(--ease-suave)] group-hover:scale-[1.04]">
                    <FotoPlaceholder rotulo="retrato" className="aspect-[4/5] w-full" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col px-2 pt-5">
                  <p className="text-sm font-extrabold uppercase tracking-[0.1em] text-marca-forte">{p.funcao}</p>
                  <h3 className="mt-1 text-xl font-black leading-tight">
                    <Ph>{p.nome}</Ph>
                  </h3>
                  <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-lg bg-nevoa px-2.5 py-1 text-sm font-extrabold text-tinta">
                    <Ph>{p.crp}</Ph>
                  </p>
                  <p className="mt-3 text-[0.95rem] font-semibold text-tinta">{p.abordagem}</p>
                  <p className="mt-1 text-sm text-suave">
                    <Ph>{p.formacao}</Ph>
                  </p>
                  <blockquote className="mt-auto border-l-2 border-sol pl-3 pt-4 text-[0.95rem] italic text-suave">
                    <Ph>{p.frase}</Ph>
                  </blockquote>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
