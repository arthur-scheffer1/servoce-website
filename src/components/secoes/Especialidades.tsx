"use client";

import { useRef } from "react";
import { especialidades } from "@/content/clinica";
import { whatsEspecialidade } from "@/lib/whatsapp";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { IlustraEspecialidade, IconeWhatsApp, Flor } from "../ilustracoes";
import Desabrochar from "../movimento/Desabrochar";

export default function Especialidades() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.movimento, () => {
        gsap.from("[data-card]", {
          y: 80,
          autoAlpha: 0,
          rotateX: -12,
          transformPerspective: 900,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: "[data-cards]", start: "top 80%", once: true },
        });
      });

      // Tilt 3D + troca de ilustração no hover (desktop)
      mm.add(MQ.ponteiroFino, () => {
        const limpar: (() => void)[] = [];
        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          const inner = card.querySelector<HTMLElement>("[data-tilt]")!;
          gsap.set(inner, { transformPerspective: 1000 });
          const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
          const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
          const y = gsap.quickTo(inner, "y", { duration: 0.6, ease: "power3.out" });
          const flor = card.querySelectorAll(".estado-flor");
          const botao = card.querySelectorAll(".estado-botao");
          gsap.set(flor, { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 100%" });
          gsap.set(botao, { autoAlpha: 1 });

          const mover = (e: PointerEvent) => {
            const r = inner.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            ry(px * 9);
            rx(-py * 9);
            inner.style.setProperty("--brilho-x", `${(px + 0.5) * 100}%`);
            inner.style.setProperty("--brilho-y", `${(py + 0.5) * 100}%`);
          };
          const entrar = () => {
            y(-8);
            gsap.to(flor, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out(2.5)",
              stagger: 0.08,
              overwrite: true,
            });
            gsap.to(botao, { autoAlpha: 0, duration: 0.25, overwrite: true });
          };
          const sair = () => {
            rx(0);
            ry(0);
            y(0);
            gsap.to(flor, { autoAlpha: 0, scale: 0.4, duration: 0.35, overwrite: true });
            gsap.to(botao, { autoAlpha: 1, duration: 0.35, overwrite: true });
          };
          card.addEventListener("pointermove", mover);
          card.addEventListener("pointerenter", entrar);
          card.addEventListener("pointerleave", sair);
          limpar.push(() => {
            card.removeEventListener("pointermove", mover);
            card.removeEventListener("pointerenter", entrar);
            card.removeEventListener("pointerleave", sair);
          });
        });
        return () => limpar.forEach((f) => f());
      });
    },
    { scope: ref },
  );

  return (
    <section
      id="especialidades"
      ref={ref}
      data-fundo="#ffffff"
      aria-labelledby="titulo-especialidades"
      className="secao"
    >
      <div className="wrap">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <Desabrochar className="w-11">
              <Flor className="w-full text-marca" />
            </Desabrochar>
            <p className="sobretitulo">especialidades</p>
            <div data-pouso className="h-1 w-6 self-end" />
          </div>
          <h2
            id="titulo-especialidades"
            className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-[2.75rem]"
          >
            Quatro especialidades, um cuidado só
          </h2>
          <p className="mt-4 text-lg text-suave">
            Cada área tem seu jeito de olhar. Juntas, elas ajudam a entender você, seu casal ou seu filho por inteiro.
          </p>
        </div>

        <ul data-cards className="mt-14 grid gap-6 md:grid-cols-2">
          {especialidades.map((e, i) => (
            <li key={e.id} id={`esp-${e.id}`} data-card className="scroll-mt-28" style={{ perspective: 1000 }}>
              <article
                data-tilt
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-7 shadow-[0_20px_50px_-30px_rgb(23_50_74_/_0.5)] ring-1 ring-ceu transition-shadow duration-500 hover:shadow-[0_40px_70px_-30px_rgb(11_111_174_/_0.55)] sm:p-8"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* brilho que segue o mouse */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--brilho-x,50%) var(--brilho-y,50%), rgb(46 170 245 / 0.12), transparent 60%)",
                  }}
                />
                <div className="flex items-start justify-between gap-4" style={{ transform: "translateZ(40px)" }}>
                  <div>
                    <span className="font-manuscrita text-2xl text-marca">0{i + 1}</span>
                    <h3 className="mt-1 text-2xl font-black leading-tight">{e.nome}</h3>
                  </div>
                  <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] bg-nevoa text-marca-forte">
                    <IlustraEspecialidade id={e.id} className="h-20 w-20" />
                  </span>
                </div>
                <p className="mt-4 text-suave" style={{ transform: "translateZ(24px)" }}>
                  {e.resumo}
                </p>

                <dl className="mt-5 space-y-4" style={{ transform: "translateZ(20px)" }}>
                  <div>
                    <dt className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">Para quem é</dt>
                    <dd className="mt-1.5">
                      <span className="inline-flex rounded-full bg-sol-claro px-3 py-1 text-sm font-bold text-tinta">
                        {e.paraQuem}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-extrabold uppercase tracking-[0.12em] text-suave">Quando procurar</dt>
                    <dd>
                      <ul className="mt-2 space-y-1.5">
                        {e.quandoProcurar.map((q) => (
                          <li key={q} className="flex gap-2.5">
                            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-marca" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto pt-7" style={{ transform: "translateZ(30px)" }}>
                  <a
                    href={whatsEspecialidade(e.id)}
                    target="_blank"
                    rel="noopener"
                    className="btn btn-primario w-full sm:w-auto"
                  >
                    <IconeWhatsApp className="h-5 w-5" />
                    Quero saber mais
                    <span className="sr-only"> sobre {e.nome}</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-10 max-w-xl text-center text-suave">
          Ficou em dúvida entre duas? Tudo bem.{" "}
          <a href="#reconhece" className="link-linha font-bold text-marca-forte">
            Use o seletor “Para quem é o atendimento?”
          </a>{" "}
          ou mande uma mensagem que a gente te orienta.
        </p>
      </div>
    </section>
  );
}
