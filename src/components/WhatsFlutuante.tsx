"use client";

import { useEffect, useState } from "react";
import { whatsFlutuante } from "@/content/clinica";
import { whatsLink } from "@/lib/whatsapp";
import { IconeWhatsApp } from "./ilustracoes";

/** Botão flutuante com pulso suave e um balão que aparece após ~20s ou 50% da rolagem. */
export default function WhatsFlutuante() {
  const [balao, setBalao] = useState(false);
  const [dispensado, setDispensado] = useState(false);

  useEffect(() => {
    if (dispensado) return;
    const t = window.setTimeout(() => setBalao(true), 20000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.5) setBalao(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [dispensado]);

  const mostrar = balao && !dispensado;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        className={`relative mb-2 max-w-[15rem] origin-bottom-right rounded-2xl rounded-br-sm bg-white p-4 pr-10 text-[0.95rem] font-bold text-tinta shadow-[0_20px_40px_-15px_rgb(23_50_74_/_0.45)] ring-1 ring-ceu transition-all duration-500 ease-[var(--ease-suave)] ${
          mostrar ? "visible scale-100 opacity-100" : "invisible scale-75 opacity-0"
        }`}
        role="status"
      >
        {mostrar && (
          <a href={whatsLink()} target="_blank" rel="noopener" className="link-linha">
            {whatsFlutuante.balao}
          </a>
        )}
        <button
          type="button"
          onClick={() => setDispensado(true)}
          aria-label="Fechar mensagem"
          className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full text-suave hover:text-tinta"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <a
        href={whatsLink()}
        target="_blank"
        rel="noopener"
        aria-label="Conversar pelo WhatsApp"
        className="pulso flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-[0_14px_30px_-10px_rgb(18_140_74_/_0.7)] transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <IconeWhatsApp className="h-8 w-8" />
      </a>
    </div>
  );
}
