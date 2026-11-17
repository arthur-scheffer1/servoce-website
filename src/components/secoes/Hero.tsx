"use client";

import { useRef } from "react";
import { hero, clinica } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import Magnetico from "../movimento/Magnetico";
import FotoPlaceholder from "../FotoPlaceholder";
import { Ph } from "../Ph";
import { Flor, Florzinha, Folha, Ramo, IconeWhatsApp, IconeSeta } from "../ilustracoes";

function Palavras({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(" ").map((p, i) => (
        <span key={i} className="palavra">
          <span data-palavra>{p}</span>
          {" "}
        </span>
      ))}
    </>
  );
}

/** Camada decorativa: o wrapper externo recebe o parallax de rolagem, o interno o do mouse. */
function Camada({
  prof,
  className,
  children,
  soDesktop = false,
}: {
  prof: number;
  className: string;
  children: React.ReactNode;
  soDesktop?: boolean;
}) {
  return (
    <div
      data-camada={prof}
      aria-hidden
      className={`pointer-events-none absolute ${soDesktop ? "hidden md:block" : ""} ${className}`}
    >
      <div data-mouse={prof}>{children}</div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const headline = hero.headlines[hero.headlineAtiva];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.movimento, () => {
        // Entrada: palavra por palavra
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from("[data-selo]", { y: 16, autoAlpha: 0, duration: 0.8 })
          .from("h1 [data-palavra]", { yPercent: 115, duration: 1.1, stagger: 0.07 }, 0.15)
          .from("[data-slogan] [data-palavra]", { yPercent: 115, duration: 0.9, stagger: 0.06 }, "-=0.6")
          .from("[data-destaque]", { color: "var(--color-tinta)", duration: 0.6, stagger: 0.35 }, "-=0.4")
          .from(
            "[data-sublinhado]",
            { scaleX: 0, transformOrigin: "0 50%", duration: 0.7, stagger: 0.35, ease: "power2.inOut" },
            "<",
          )
          .from("[data-florescer]", { autoAlpha: 0, scale: 0.6, rotate: -8, duration: 1, ease: "back.out(2)" }, "-=0.2")
          .from("[data-entra]", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, "-=0.8")
          .from(
            "[data-foto]",
            { clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)", duration: 1.6, ease: "expo.out" },
            0.2,
          )
          .from(
            "[data-camada]",
            { autoAlpha: 0, scale: 0.5, duration: 1.4, stagger: 0.08, ease: "back.out(1.4)" },
            0.6,
          );

        // Parallax das camadas com a rolagem
        gsap.utils.toArray<HTMLElement>("[data-camada]").forEach((c) => {
          const prof = parseFloat(c.dataset.camada!);
          gsap.to(c, {
            y: () => -window.innerHeight * 0.55 * prof,
            rotate: prof * 18,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
        gsap.to("[data-foto-wrap]", {
          y: () => window.innerHeight * 0.12,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Mouse (só desktop com ponteiro fino)
      mm.add(MQ.ponteiroFino, () => {
        const alvos = gsap.utils.toArray<HTMLElement>("[data-mouse]").map((el) => ({
          prof: parseFloat(el.dataset.mouse!),
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const mover = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          alvos.forEach((a) => {
            a.x(nx * 60 * a.prof);
            a.y(ny * 40 * a.prof);
          });
        };
        window.addEventListener("pointermove", mover);
        return () => window.removeEventListener("pointermove", mover);
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="inicio"
      ref={ref}
      data-fundo="#ffffff"
      aria-labelledby="titulo-hero"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2rem)] lg:flex lg:min-h-[100svh] lg:items-center lg:pt-[var(--header-h)]"
    >
      {/* formas orgânicas de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-[20%] -top-[10%] h-[80vmax] w-[80vmax] rounded-[42%_58%_63%_37%/45%_40%_60%_55%] bg-nevoa" />
        <div className="absolute -bottom-[30%] -left-[15%] h-[50vmax] w-[50vmax] rounded-[60%_40%_45%_55%/50%_60%_40%_50%] bg-creme" />
      </div>

      <div className="wrap grid items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-12">
        <div className="relative z-10 max-w-2xl">
          <p
            data-selo
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-marca-forte shadow-[0_6px_20px_-10px_rgb(11_111_174_/_0.5)] ring-1 ring-ceu"
          >
            <Florzinha className="h-5 w-5" cor="var(--color-marca)" />
            {clinica.selo}
          </p>

          <h1
            id="titulo-hero"
            className="text-[2.35rem] font-black leading-[1.08] text-tinta sm:text-5xl lg:text-[3.6rem]"
          >
            <Palavras texto={headline} />
          </h1>

          <p data-slogan className="mt-5 text-xl font-semibold leading-snug text-suave sm:text-2xl">
            <span className="palavra">
              <span data-palavra>Um</span>&nbsp;
            </span>
            <span className="palavra">
              <span data-palavra>espaço</span>&nbsp;
            </span>
            <span className="palavra">
              <span data-palavra>para</span>&nbsp;
            </span>
            <span className="palavra relative">
              <span data-palavra>
                <strong data-destaque className="relative font-extrabold text-marca-forte">
                  ouvir
                  <span
                    data-sublinhado
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-[5px] w-full rounded-full bg-sol/70"
                  />
                </strong>
                ,
              </span>
              &nbsp;
            </span>
            <span className="palavra">
              <span data-palavra>
                <strong data-destaque className="relative font-extrabold text-marca-forte">
                  acolher
                  <span
                    data-sublinhado
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-[5px] w-full rounded-full bg-sol/70"
                  />
                </strong>
              </span>
              &nbsp;
            </span>
            <span className="palavra">
              <span data-palavra>e</span>&nbsp;
            </span>
            <span
              data-florescer
              className="ml-1.5 inline-block font-manuscrita text-[2.2em] font-normal leading-none text-marca-forte"
            >
              florescer.
            </span>
          </p>

          <p data-entra className="mt-6 max-w-xl text-lg text-suave">
            <Ph>{hero.subtitulo}</Ph>
          </p>

          <div data-entra className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetico>
              <a
                href={whatsLink()}
                target="_blank"
                rel="noopener"
                className="btn btn-primario w-full text-lg sm:w-auto"
              >
                <IconeWhatsApp className="h-6 w-6" />
                {hero.ctaPrincipal}
              </a>
            </Magnetico>
            <a href="#especialidades" className="btn btn-secundario group w-full sm:w-auto">
              {hero.ctaSecundario}
              <IconeSeta className="h-5 w-5 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          <p data-entra className="mt-5 flex items-start gap-2 text-[0.95rem] text-suave">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 h-5 w-5 shrink-0 text-marca-forte"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              aria-hidden
            >
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {hero.reducaoRisco}
          </p>
        </div>

        {/* Visual em camadas */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[460px]">
          <div data-foto-wrap className="absolute inset-[6%_8%_0_8%]">
            <div
              data-foto
              className="h-full w-full"
              style={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)" }}
            >
              <FotoPlaceholder rotulo="o espaço da clínica" className="h-full w-full" />
            </div>
          </div>

          <Camada prof={0.35} className="-left-[6%] top-[8%] w-[30%] text-marca">
            <Flor className="balanco w-full" cor="var(--color-marca)" />
          </Camada>
          <Camada prof={0.8} className="-right-[4%] top-[30%] w-[24%]">
            <div data-pouso className="mx-auto h-1 w-6" />
            <Flor className="w-full" preenchida cor="#ffffff" />
          </Camada>
          <Camada prof={0.55} className="-left-[10%] bottom-[2%] w-[26%] text-marca">
            <Ramo className="w-full" />
          </Camada>
          <Camada prof={1.1} className="right-[2%] bottom-[6%] w-[16%]" soDesktop>
            <Florzinha className="w-full" cor="var(--color-marca)" />
          </Camada>
          <Camada prof={1.4} className="left-[18%] -top-[2%] w-[12%] text-marca" soDesktop>
            <Folha className="w-full rotate-[-20deg]" />
          </Camada>
          <Camada prof={0.9} className="right-[18%] -top-[1%] w-[9%]" soDesktop>
            <Florzinha className="w-full" cor="var(--color-sol)" />
          </Camada>
          <Camada prof={1.25} className="-right-[8%] bottom-[30%] w-[10%] text-marca" soDesktop>
            <Folha className="w-full rotate-[130deg]" />
          </Camada>
        </div>
      </div>

      <a
        href="#reconhece"
        className="absolute bottom-6 left-1/2 hidden min-h-11 -translate-x-1/2 flex-col items-center gap-1 text-sm font-bold text-suave lg:flex"
      >
        Role para conhecer
        <span aria-hidden className="relative h-10 w-6 rounded-full border-2 border-marca/60">
          <span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-marca" />
        </span>
      </a>
    </section>
  );
}
