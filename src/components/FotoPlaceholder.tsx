import { Flor, Folha } from "./ilustracoes";

/**
 * Moldura de foto ainda não fornecida. Bem marcada para a apresentação.
 * Quando houver a foto real, troque por <img src="/fotos/..." alt="..." />.
 */
export default function FotoPlaceholder({
  rotulo,
  className = "",
  forma = "arco",
}: {
  rotulo: string;
  className?: string;
  forma?: "arco" | "redonda" | "card";
}) {
  const raio =
    forma === "arco" ? "rounded-t-[999px] rounded-b-[2rem]" : forma === "redonda" ? "rounded-full" : "rounded-[1.5rem]";
  return (
    <div
      role="img"
      aria-label={`Espaço reservado para foto: ${rotulo}`}
      className={`relative isolate flex items-end justify-center overflow-hidden bg-gradient-to-b from-[#c4e3fa] via-ceu to-[#e6f4fe] shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.7)] ${raio} ${className}`}
    >
      <Flor className="absolute left-1/2 top-[38%] w-[34%] max-w-40 -translate-x-1/2 -translate-y-1/2 text-white" />
      <Folha className="absolute bottom-[22%] left-[14%] w-[18%] -rotate-12 text-white/80" />
      <Folha className="absolute right-[12%] top-[20%] w-[14%] rotate-[160deg] text-white/70" />
      <span className="ph relative z-10 mb-[9%] inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 8h3l2-3h6l2 3h3v11H4Z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
        Foto: {rotulo}
      </span>
    </div>
  );
}
