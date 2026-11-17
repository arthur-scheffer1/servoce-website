import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { title?: string };

const PETALA = "M0 -6 C -9 -14, -9 -30, 0 -36 C 9 -30, 9 -14, 0 -6Z";

/**
 * Flor de 5 pétalas em traço fino com miolo amarelo (motivo da logo).
 * Classes internas usadas pelas animações: .petala, .miolo, .caule, .folha
 */
export function Flor({
  title,
  preenchida = false,
  caule = false,
  cor = "currentColor",
  ...p
}: P & { preenchida?: boolean; caule?: boolean; cor?: string }) {
  return (
    <svg
      viewBox={caule ? "-45 -45 90 150" : "-45 -45 90 90"}
      fill="none"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...p}
    >
      {title && <title>{title}</title>}
      {caule && (
        <g stroke={cor} strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path className="caule" d="M0 6 C 2 40, -6 70, 2 102" pathLength={1} />
          <path className="folha" d="M1 58 C 14 44, 30 46, 34 52 C 26 62, 12 64, 1 58Z" pathLength={1} />
          <path className="folha" d="M-1 78 C -14 66, -30 68, -34 74 C -26 84, -12 86, -1 78Z" pathLength={1} />
        </g>
      )}
      <g>
        {[0, 72, 144, 216, 288].map((r) => (
          <g key={r} transform={`rotate(${r})`}>
            <path
              className="petala"
              d={PETALA}
              stroke={cor}
              strokeWidth="2.2"
              strokeLinejoin="round"
              fill={preenchida ? cor : "none"}
              pathLength={1}
            />
          </g>
        ))}
        <circle className="miolo" r="6.5" fill="var(--color-sol)" />
      </g>
    </svg>
  );
}

/** Florzinha simples (preenchida) para salpicar */
export function Florzinha({ cor = "currentColor", ...p }: P & { cor?: string }) {
  return (
    <svg viewBox="-20 -20 40 40" aria-hidden {...p}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="0" cy="-9" rx="5.5" ry="8" fill={cor} transform={`rotate(${r})`} />
      ))}
      <circle r="4" fill="var(--color-sol)" />
    </svg>
  );
}

/** Ramo curvo com folhas e florzinhas */
export function Ramo({ cor = "currentColor", ...p }: P & { cor?: string }) {
  return (
    <svg viewBox="0 0 120 220" fill="none" aria-hidden {...p}>
      <g stroke={cor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path className="caule" d="M60 215 C 50 170, 72 130, 58 90 C 48 60, 62 30, 78 8" pathLength={1} />
        <path className="folha" d="M57 160 C 40 150, 24 152, 18 160 C 28 170, 46 170, 57 160Z" pathLength={1} />
        <path className="folha" d="M62 122 C 78 108, 96 110, 102 118 C 92 130, 74 132, 62 122Z" pathLength={1} />
        <path className="folha" d="M55 78 C 40 64, 24 66, 18 74 C 28 86, 44 88, 55 78Z" pathLength={1} />
        <path className="folha" d="M66 44 C 80 30, 96 32, 100 40 C 92 52, 76 54, 66 44Z" pathLength={1} />
      </g>
      <g className="botoes">
        <circle cx="78" cy="8" r="4" fill="var(--color-sol)" />
        <circle cx="18" cy="160" r="3" fill="var(--color-sol)" />
      </g>
    </svg>
  );
}

const ASA =
  "M50 42 C 44 18, 22 2, 10 8 C 0 14, 4 32, 22 38 C 32 41, 42 42, 50 43 C 38 46, 20 54, 22 66 C 24 76, 40 72, 50 46Z";

/** Borboleta em traço fino. As asas batem via CSS (.asa). */
export function Borboleta({
  cor = "currentColor",
  preenchida = false,
  ...p
}: P & { cor?: string; preenchida?: boolean }) {
  const fill = preenchida ? "rgb(255 255 255 / 0.85)" : "none";
  return (
    <svg viewBox="0 0 100 80" fill="none" aria-hidden {...p}>
      <g stroke={cor} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path className="asa asa-esq" d={ASA} fill={fill} />
        <g transform="matrix(-1 0 0 1 100 0)">
          <path className="asa asa-esq" d={ASA} fill={fill} />
        </g>
        <path d="M50 30 L50 60" strokeWidth="3" />
        <path d="M50 30 C 47 22, 44 18, 40 16 M50 30 C 53 22, 56 18, 60 16" strokeWidth="1.8" />
      </g>
    </svg>
  );
}

/** Folha solta */
export function Folha({ cor = "currentColor", ...p }: P & { cor?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" aria-hidden {...p}>
      <path
        d="M4 34 C 14 10, 38 2, 56 6 C 50 24, 30 38, 4 34Z M4 34 C 22 24, 36 16, 50 10"
        stroke={cor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Ícones de valores ---------- */
export function IconeValor({ tipo, ...p }: P & { tipo: string }) {
  const comum = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...p}>
      {tipo === "sigilo" && (
        <g {...comum}>
          <rect x="10" y="21" width="28" height="21" rx="6" />
          <path d="M16 21v-5a8 8 0 0 1 16 0v5" />
          <path
            d="M24 37c-4-2.6-6-4.6-6-7a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 2.4-2 4.4-6 7Z"
            fill="var(--color-sol)"
            stroke="none"
          />
        </g>
      )}
      {tipo === "escuta" && (
        <g {...comum}>
          <path d="M8 22c0-8 7-14 16-14s16 6 16 14-7 14-16 14c-2 0-4-.3-5.8-.8L10 39l2.4-6.6C9.6 29.8 8 26 8 22Z" />
          <circle cx="17" cy="22" r="1.8" fill="currentColor" />
          <circle cx="24" cy="22" r="1.8" fill="var(--color-sol)" stroke="none" />
          <circle cx="31" cy="22" r="1.8" fill="currentColor" />
        </g>
      )}
      {tipo === "integrado" && (
        <g {...comum}>
          <circle cx="18" cy="19" r="9" />
          <circle cx="30" cy="19" r="9" />
          <circle cx="24" cy="29" r="9" />
          <circle cx="24" cy="22.5" r="2.6" fill="var(--color-sol)" stroke="none" />
        </g>
      )}
    </svg>
  );
}

/* ---------- Ilustrações das especialidades (2 estados: botão e flor aberta) ---------- */
export function IlustraEspecialidade({ id, ...p }: P & { id: string }) {
  const s = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 120 120" aria-hidden {...p}>
      {id === "tcc" && (
        <g {...s}>
          {/* balões de conversa + ramo */}
          <path d="M20 30h52a10 10 0 0 1 10 10v22a10 10 0 0 1-10 10H44l-14 12v-12h-10a10 10 0 0 1-10-10V40a10 10 0 0 1 10-10Z" />
          <path d="M30 48h34M30 58h22" />
          <path className="estado-flor" d="M92 96c0-14 0-26 6-36" />
          <g className="estado-flor" transform="translate(98 56)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-8" rx="5" ry="7.5" transform={`rotate(${r})`} />
            ))}
            <circle r="3.6" fill="var(--color-sol)" stroke="none" />
          </g>
          <path className="estado-botao" d="M98 96c0-10 0-18-2-26 M96 70c-5-2-7-7-6-12 5 1 8 5 6 12Z" />
        </g>
      )}
      {id === "neuro" && (
        <g {...s}>
          {/* lupa + quebra-cabeça */}
          <circle cx="50" cy="50" r="26" />
          <path d="M69 69l20 20" strokeWidth="5" />
          <path d="M40 44h8a4 4 0 1 1 6 0h8v8a4 4 0 1 0 0 6v8H54a4 4 0 1 0-6 0h-8V58a4 4 0 1 1 0-6Z" />
          <g className="estado-flor" transform="translate(96 30)">
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="0" cy="-7" rx="4.5" ry="6.5" transform={`rotate(${r})`} />
            ))}
            <circle r="3.2" fill="var(--color-sol)" stroke="none" />
          </g>
          <circle className="estado-botao" cx="96" cy="30" r="4" fill="var(--color-sol)" stroke="none" />
        </g>
      )}
      {id === "psicopedagogia" && (
        <g {...s}>
          {/* livro aberto + broto */}
          <path d="M60 92c-12-8-28-10-44-8V36c16-2 32 0 44 8 12-8 28-10 44-8v48c-16-2-32 0-44 8Z" />
          <path d="M60 44v48" />
          <path
            d="M26 50c8 0 16 2 24 6M26 62c8 0 16 2 24 6M70 56c8-4 16-6 24-6M70 68c8-4 16-6 24-6"
            strokeWidth="1.6"
          />
          <path className="estado-botao" d="M60 36c0-8 0-12 2-16 M62 22c-4-6-12-6-14-2 4 4 10 5 14 2Z" />
          <g className="estado-flor">
            <path d="M60 36c0-10 0-16 1-22" />
            <g transform="translate(61 12)">
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cx="0" cy="-6.5" rx="4.2" ry="6" transform={`rotate(${r})`} />
              ))}
              <circle r="3" fill="var(--color-sol)" stroke="none" />
            </g>
          </g>
        </g>
      )}
      {id === "sistemica" && (
        <g {...s}>
          {/* dois caules entrelaçados */}
          <path d="M40 104c0-24 30-30 30-56" />
          <path d="M80 104c0-24-30-30-30-56" />
          <path d="M44 84c-8-2-14-8-14-14 8 0 14 6 14 14ZM76 84c8-2 14-8 14-14-8 0-14 6-14 14Z" />
          <g className="estado-botao">
            <circle cx="70" cy="44" r="4" fill="var(--color-sol)" stroke="none" />
            <circle cx="50" cy="44" r="4" fill="var(--color-sol)" stroke="none" />
          </g>
          <g className="estado-flor">
            {[
              [70, 38],
              [50, 38],
            ].map(([x, y]) => (
              <g key={x} transform={`translate(${x} ${y})`}>
                {[0, 72, 144, 216, 288].map((r) => (
                  <ellipse key={r} cx="0" cy="-7" rx="4.5" ry="6.5" transform={`rotate(${r})`} />
                ))}
                <circle r="3.2" fill="var(--color-sol)" stroke="none" />
              </g>
            ))}
          </g>
        </g>
      )}
    </svg>
  );
}

export function IconeWhatsApp(p: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...p}>
      <path
        fill="currentColor"
        d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z"
      />
    </svg>
  );
}

export function IconeInstagram(p: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconeSeta(p: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...p}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
