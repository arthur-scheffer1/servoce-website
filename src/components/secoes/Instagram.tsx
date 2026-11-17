"use client";

import { useRef } from "react";
import { instagramPosts, clinica } from "@/content/clinica";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Ph } from "../Ph";
import { Flor, Florzinha, IconeInstagram, IconeSeta } from "../ilustracoes";

const fundos = ["from-marca-forte to-marca-escura", "from-sol-claro to-[#fbe5a4]", "from-ceu to-nevoa"];

export default function Instagram() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-post]", {
          y: 60,
          rotate: (i) => [-3, 2, -1.5][i] ?? 0,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-posts]", start: "top 82%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="conteudos" ref={ref} data-fundo="#ffffff" aria-labelledby="titulo-insta" className="secao">
      <div className="wrap">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <p className="sobretitulo">para levar com você</p>
              <div data-pouso className="h-1 w-6 self-end" />
            </div>
            <h2 id="titulo-insta" className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              {instagramPosts.titulo}
            </h2>
            <p className="mt-3 text-lg text-suave">{instagramPosts.intro}</p>
          </div>
          <a
            href={clinica.instagramUrl}
            target="_blank"
            rel="noopener"
            className="btn btn-secundario self-start md:self-end"
          >
            <IconeInstagram className="h-5 w-5" />
            Seguir @{clinica.instagram}
          </a>
        </div>

        <ul data-posts className="mt-10 grid gap-5 sm:grid-cols-3">
          {instagramPosts.posts.map((p, i) => (
            <li key={i} data-post>
              <a
                href={clinica.instagramUrl}
                target="_blank"
                rel="noopener"
                className="group relative flex aspect-square flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-6 ring-1 ring-ceu transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span
                  aria-hidden
                  className={`absolute inset-0 -z-10 bg-gradient-to-br ${fundos[i % 3]} transition-transform duration-700 group-hover:scale-105`}
                />
                <Flor
                  aria-hidden
                  className={`absolute -bottom-8 -right-8 w-40 transition-transform duration-700 group-hover:rotate-45 ${i === 0 ? "text-white/40" : "text-marca/25"}`}
                  cor="currentColor"
                />
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-extrabold ${
                    i === 0 ? "bg-white/20 text-white" : "bg-white text-marca-forte"
                  }`}
                >
                  <Florzinha className="h-4 w-4" cor={i === 0 ? "#fff" : "var(--color-marca)"} />
                  {p.tema}
                </span>
                <span className={`relative text-xl font-black leading-snug ${i === 0 ? "text-white" : "text-tinta"}`}>
                  <Ph>{p.titulo}</Ph>
                </span>
                <span
                  className={`relative inline-flex items-center gap-1.5 text-sm font-bold ${i === 0 ? "text-white" : "text-marca-forte"}`}
                >
                  <IconeInstagram className="h-4 w-4" /> Ver no Instagram
                  <IconeSeta className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
