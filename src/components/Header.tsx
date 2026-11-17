"use client";

import { useEffect, useState } from "react";
import { menu, clinica } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import Magnetico from "./movimento/Magnetico";
import { IconeWhatsApp, IconeInstagram, Florzinha } from "./ilustracoes";

export default function Header() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const [ativo, setAtivo] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setRolou(window.scrollY > 24);
      if (window.scrollY < window.innerHeight * 0.5) setAtivo("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = menu.map((m) => m.href.slice(1));
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setAtivo(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    const fechar = () => setAberto(false);
    window.addEventListener("servoce:navegou", fechar);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("servoce:navegou", fechar);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = aberto ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [aberto]);

  return (
    <>
      <a href="#conteudo" className="btn btn-primario fixed left-4 top-3 z-[80] -translate-y-24 focus:translate-y-0">
        Pular para o conteúdo
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          rolou || aberto
            ? "bg-white/85 shadow-[0_8px_30px_-18px_rgb(23_50_74_/_0.35)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-4">
          <a href="#inicio" className="flex min-h-11 items-center" aria-label="Ser Você – início">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo-compacta-blue.png"
              alt="Ser Você – Clínica de Psicologia Integrada"
              width={520}
              height={220}
              className="h-12 w-auto md:h-14"
            />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {menu.map((m) => {
                const atual = ativo === m.href.slice(1);
                return (
                  <li key={m.href}>
                    <a
                      href={m.href}
                      aria-current={atual ? "location" : undefined}
                      className={`relative inline-flex min-h-11 items-center rounded-full px-3.5 text-[0.95rem] font-bold transition-colors ${
                        atual ? "text-marca-forte" : "text-tinta/80 hover:text-marca-forte"
                      }`}
                    >
                      {m.rotulo}
                      <span
                        aria-hidden
                        className={`absolute bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sol transition-transform duration-300 ${
                          atual ? "scale-100" : "scale-0"
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <Magnetico>
                <a
                  href={whatsLink()}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primario !min-h-11 !px-5 text-[0.95rem]"
                >
                  <IconeWhatsApp className="h-5 w-5" />
                  Agendar conversa
                </a>
              </Magnetico>
            </div>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-movel"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-nevoa text-marca-forte lg:hidden"
            >
              <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
              <span
                aria-hidden
                className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${aberto ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                aria-hidden
                className={`absolute h-0.5 w-5 rounded bg-current transition-transform duration-300 ${aberto ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu móvel em tela cheia */}
      <div
        id="menu-movel"
        hidden={!aberto}
        className="fixed inset-0 z-40 overflow-y-auto bg-white pt-[var(--header-h)] lg:hidden"
      >
        <Florzinha className="pointer-events-none absolute -right-6 bottom-24 w-32 text-nevoa" cor="var(--color-ceu)" />
        <nav aria-label="Menu" className="wrap flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {menu.map((m, i) => (
              <li key={m.href} className="border-b border-ceu/70">
                <a
                  href={m.href}
                  className="flex min-h-16 items-center justify-between text-2xl font-extrabold text-tinta"
                  style={{
                    animation: aberto ? `entrar-menu .5s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)` : undefined,
                  }}
                >
                  {m.rotulo}
                  <span className="font-manuscrita text-lg font-normal text-marca-forte">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <a href={whatsLink()} target="_blank" rel="noopener" className="btn btn-primario w-full">
              <IconeWhatsApp className="h-5 w-5" /> Conversar pelo WhatsApp
            </a>
            <a href={clinica.instagramUrl} target="_blank" rel="noopener" className="btn btn-secundario w-full">
              <IconeInstagram className="h-5 w-5" /> @{clinica.instagram}
            </a>
          </div>
        </nav>
        <style>{`@keyframes entrar-menu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}`}</style>
      </div>
    </>
  );
}
