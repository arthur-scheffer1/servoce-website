"use client";

import { useRef } from "react";
import { clinica, contato, menu } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { Ph } from "../Ph";
import Magnetico from "../movimento/Magnetico";
import { Flor, Florzinha, IconeInstagram, IconeWhatsApp } from "../ilustracoes";

function MapaPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Espaço reservado para o mapa com a localização da clínica"
      className="relative isolate h-full min-h-72 overflow-hidden rounded-[var(--radius-card)] bg-nevoa ring-1 ring-ceu"
    >
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g fill="none" stroke="#fff" strokeLinecap="round">
          <path d="M-20 80 C 100 60, 200 120, 420 90" strokeWidth="14" />
          <path d="M-20 210 C 120 230, 260 170, 420 220" strokeWidth="10" />
          <path d="M110 -20 C 130 100, 90 200, 140 320" strokeWidth="12" />
          <path d="M290 -20 C 270 90, 320 200, 280 320" strokeWidth="8" />
        </g>
        <g fill="var(--color-ceu)">
          <rect x="160" y="110" width="90" height="70" rx="14" />
          <rect x="20" y="110" width="70" height="80" rx="14" />
          <rect x="310" y="120" width="80" height="70" rx="14" />
          <rect x="170" y="240" width="90" height="60" rx="14" />
        </g>
        <circle cx="200" cy="140" r="34" fill="rgb(46 170 245 / 0.18)" />
      </svg>
      <div data-pino className="absolute left-1/2 top-[46%] w-14 -translate-x-1/2 -translate-y-full">
        <svg viewBox="0 0 48 64" aria-hidden className="w-full drop-shadow-lg">
          <path d="M24 62C24 62 4 38 4 23a20 20 0 0 1 40 0c0 15-20 39-20 39Z" fill="var(--color-marca-forte)" />
          <circle cx="24" cy="23" r="10" fill="#fff" />
          <circle cx="24" cy="23" r="4" fill="var(--color-sol)" />
        </svg>
      </div>
      <span className="ph absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 text-xs font-bold">
        Mapa: inserir Google Maps
      </span>
    </div>
  );
}

export default function Contato() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-pino]", {
          y: -80,
          autoAlpha: 0,
          duration: 1.2,
          ease: "bounce.out",
          scrollTrigger: { trigger: "[data-pino]", start: "top 85%", once: true },
        });
        gsap.from("[data-info]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: "[data-infos]", start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="contato" ref={ref} data-fundo="#ffffff" aria-labelledby="titulo-contato" className="secao pb-16">
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <p className="sobretitulo">contato</p>
            <div data-pouso className="h-1 w-6 self-end" />
          </div>
          <h2 id="titulo-contato" className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            {contato.titulo}
          </h2>
          <p className="mt-4 text-lg text-suave">{contato.texto}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Magnetico>
              <a
                href={whatsLink()}
                target="_blank"
                rel="noopener"
                className="btn btn-primario w-full text-lg sm:w-auto"
              >
                <IconeWhatsApp className="h-6 w-6" />
                Conversar pelo WhatsApp
              </a>
            </Magnetico>
            <a href={clinica.instagramUrl} target="_blank" rel="noopener" className="btn btn-secundario">
              <IconeInstagram className="h-5 w-5" />
              Seguir no Instagram
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <ul data-infos className="grid gap-4 sm:grid-cols-2">
            <li data-info className="rounded-[1.5rem] bg-nevoa p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">Endereço</h3>
              <p className="mt-2 font-bold">
                <Ph>{clinica.endereco}</Ph>
              </p>
              <p className="mt-1 text-suave">
                <Ph>{clinica.enderecoComplemento}</Ph>
              </p>
              <p className="mt-1 text-suave">
                <Ph>{clinica.cidade}</Ph>
              </p>
              {clinica.mapaUrl && (
                <a
                  href={clinica.mapaUrl}
                  target="_blank"
                  rel="noopener"
                  className="link-linha mt-3 inline-flex min-h-11 items-center font-bold text-marca-forte"
                >
                  Como chegar
                </a>
              )}
            </li>
            <li data-info className="rounded-[1.5rem] bg-nevoa p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">Horários</h3>
              <ul className="mt-2 space-y-1">
                {clinica.horarios.map((h) => (
                  <li key={h.dias}>
                    <span className="font-bold">{h.dias}:</span>{" "}
                    <span className="text-suave">
                      <Ph>{h.horas}</Ph>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-suave">
                Atendimento <Ph>{clinica.modalidades}</Ph>
              </p>
            </li>
            <li data-info className="rounded-[1.5rem] bg-nevoa p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">WhatsApp</h3>
              <a
                href={whatsLink()}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-marca-forte"
              >
                <IconeWhatsApp className="h-5 w-5 text-[#128c4a]" />
                <Ph>{clinica.whatsappExibicao}</Ph>
              </a>
            </li>
            <li data-info className="rounded-[1.5rem] bg-nevoa p-6">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">Instagram</h3>
              <a
                href={clinica.instagramUrl}
                target="_blank"
                rel="noopener"
                className="link-linha mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-marca-forte"
              >
                <IconeInstagram className="h-5 w-5" />@{clinica.instagram}
              </a>
            </li>
            <li data-info className="flex gap-4 rounded-[1.5rem] bg-sol-claro p-6 ring-1 ring-sol sm:col-span-2">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-xl font-black text-[#8a6500]"
              >
                !
              </span>
              <p className="text-[0.95rem] font-semibold text-tinta">
                <strong className="font-black">Em caso de emergência,</strong> {contato.emergencia}
              </p>
            </li>
          </ul>
          <MapaPlaceholder />
        </div>
      </div>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-marca-forte to-marca-escura text-white">
      <Flor aria-hidden className="absolute -right-16 -top-16 w-72 opacity-15" cor="#fff" />
      <div className="wrap relative grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-white.png"
            alt="Ser Você – Clínica de Psicologia Integrada"
            width={900}
            height={477}
            className="h-auto w-56"
            loading="lazy"
          />
          <p className="mt-4 font-manuscrita text-3xl text-white">{clinica.slogan}</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/80">Navegue</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4">
            {menu.map((m) => (
              <li key={m.href}>
                <a href={m.href} className="link-linha inline-flex min-h-11 items-center font-semibold">
                  {m.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-white/80">Responsável técnica</h2>
          <p className="mt-3 font-semibold">
            <Ph>{clinica.responsavelTecnico.nome}</Ph>
          </p>
          <p className="mt-1">
            <Ph>{clinica.responsavelTecnico.crp}</Ph>
          </p>
          <p className="mt-4 text-sm text-white/85">
            Atendimento em conformidade com o Código de Ética Profissional do Psicólogo (CFP).
          </p>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="wrap flex flex-col gap-2 pb-28 pt-6 text-sm sm:pb-6 text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {clinica.nomeCompleto}</p>
          <p className="flex items-center gap-1.5">
            <Florzinha className="h-4 w-4" cor="#fff" /> CVV 188 · SAMU 192
          </p>
        </div>
      </div>
    </footer>
  );
}
