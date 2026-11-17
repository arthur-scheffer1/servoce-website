import { isPlaceholder } from "@/lib/whatsapp";

/**
 * Renderiza um texto do arquivo de conteúdo. Trechos entre [colchetes]
 * aparecem destacados como placeholder.
 */
export function Ph({ children }: { children: string }) {
  const partes = children.split(/(\[[^\]]+\])/g).filter(Boolean);
  return (
    <>
      {partes.map((p, i) =>
        isPlaceholder(p) ? (
          <mark key={i} className="ph" title="Placeholder: trocar em src/content/clinica.ts">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
