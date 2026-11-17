import { clinica, nomeEspecialidade, type EspecialidadeId } from "@/content/clinica";

/** Monta o link do WhatsApp com a mensagem já escrita. */
export function whatsLink(mensagem: string = clinica.mensagemPadrao) {
  return `https://wa.me/${clinica.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function whatsEspecialidade(id: EspecialidadeId) {
  return whatsLink(`Olá! Vim pelo site da Ser Você e gostaria de saber mais sobre ${nomeEspecialidade(id)}.`);
}

/** true quando o texto ainda é um placeholder do tipo "[...]" */
export function isPlaceholder(v: string) {
  return /^\[.*\]$/.test(v.trim());
}
