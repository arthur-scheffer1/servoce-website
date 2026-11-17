# Ser Você – Clínica de Psicologia Integrada

Protótipo do site institucional da **Ser Você** — _"Um espaço para ouvir, acolher e florescer."_

One-page em Next.js (App Router) + Tailwind CSS + TypeScript, com animações em GSAP/ScrollTrigger e rolagem suave com Lenis. Sem backend: a ação principal é agendar pelo WhatsApp.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde trocar os textos e dados

Tudo fica em **`src/content/clinica.ts`**: nome, WhatsApp, Instagram, endereço, horários, equipe, especialidades, perguntas frequentes etc.

- Textos entre `[colchetes]` são **placeholders** e aparecem destacados em amarelo no site até serem trocados.
- **WhatsApp:** troque `whatsapp: "55XXXXXXXXXXX"` pelo número real (55 + DDD + número, só dígitos).
- **Headline do hero:** `hero.headlineAtiva` aceita `"a"` ou `"b"`.
- **Fotos:** os blocos "Foto: …" são o componente `FotoPlaceholder`. Coloque as imagens em `public/fotos/` e troque pelo `<img>` correspondente.
- **Mapa:** preencha `mapaUrl` com o link do Google Maps para exibir o botão "Como chegar".

## Estrutura

```
src/
  app/            layout (SEO, fontes) e página
  content/        clinica.ts — todos os textos e dados
  components/
    secoes/       Hero, Reconhece, Sobre, Especialidades, ParaQuem, Equipe,
                  ComoFunciona, Instagram, Duvidas, Contato (+ Rodapé)
    movimento/    Lenis, barra de progresso, borboleta-guia, flores que desabrocham, botão magnético
    ilustracoes.tsx  flores, ramos, borboleta e ícones em SVG
public/brand/     versões da logo (azul, branca, símbolo), og.jpg
scripts/          process-logo.py — gera as versões da logo a partir do JPG original
```

## Ética (CFP)

Sem depoimentos, sem promessas de resultado, sem preço como propaganda, sem urgência ou escassez. CRP de cada profissional em destaque e aviso de emergência (CVV 188 / SAMU 192).

## Publicar na Vercel

1. Acesse https://vercel.com/new e importe este repositório do GitHub.
2. A Vercel detecta Next.js sozinha; clique em **Deploy**.
3. Quando tiver domínio próprio, adicione em _Settings → Domains_ e atualize `siteUrl` em `src/content/clinica.ts`.
