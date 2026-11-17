# Prompt: Protótipo do site da Ser Você, Clínica de Psicologia Integrada

> Cole tudo abaixo no Claude Code, dentro de uma pasta nova (ex.: `ServoceWebsite`). Coloque a logo em `public/logo.png` antes.

---

Quero que você construa o **protótipo do site institucional da "Ser Você – Clínica de Psicologia Integrada"**. É um protótipo para apresentar à cliente, então precisa estar bonito, completo e responsivo, mas sem backend.

Use as skills de design disponíveis (design-taste-frontend, web-design-guidelines, react-best-practices). Antes de codar, me mostre em tópicos o plano de seções e a direção visual, e espere minha aprovação. Vá me contando cada etapa que estiver fazendo.

## 1. Sobre a clínica
- **Nome:** Ser Você – Clínica de Psicologia Integrada
- **Slogan:** "Um espaço para ouvir, acolher e florescer."
- **Instagram:** @clinica_servoce
- **Proposta:** clínica integrada. Diferentes especialidades trabalham juntas, então a pessoa (ou a família) encontra cuidado completo num lugar só.
- **Equipe (4 profissionais):**
  1. Psicóloga clínica, Terapia Cognitivo-Comportamental (TCC), atendimento de adultos
  2. Neuropsicóloga, avaliação neuropsicológica (TDAH, TEA, memória, atenção, aprendizagem)
  3. Psicopedagoga, dificuldades e processos de aprendizagem (crianças e adolescentes)
  4. Psicóloga sistêmica, terapia de casal e de adultos
- Dados ainda não fornecidos (usar **placeholders bem marcados**, nunca inventar): nomes, CRPs, fotos da equipe, endereço, telefone/WhatsApp, horários, se atende online, convênios.

## 2. Objetivo do site
Ação principal: **agendar pelo WhatsApp**. Ação secundária: seguir no Instagram.
Público: adultos buscando terapia, casais, e pais buscando avaliação/acompanhamento para filhos.

## 3. Estrutura (one-page com rolagem + âncoras)
1. **Header fixo**: logo, menu (Sobre · Especialidades · Equipe · Como funciona · Dúvidas · Contato), botão "Agendar conversa".
2. **Hero**: headline acolhedora + slogan, subtítulo (psicologia integrada, cidade, presencial/online), CTA WhatsApp + CTA secundário "Conheça as especialidades". Visual leve inspirado no motivo da logo (flores/borboleta), fotos reais do espaço (placeholder).
2.1 **"Você se reconhece?"**: frases de identificação + seletor "Para quem é o atendimento?" (ver 4.2).
3. **Sobre a clínica**: o que é psicologia integrada e por que isso importa. Curto e humano.
4. **Especialidades**: 4 cards (Psicoterapia TCC adultos · Avaliação neuropsicológica · Psicopedagogia · Terapia sistêmica de casal e adultos). Cada um com: para quem é, quando procurar, botão "Quero saber mais" que abre o WhatsApp já com a especialidade escrita na mensagem.
5. **Para quem é** (atalhos por perfil): "Para você" · "Para o casal" · "Para seu filho", cada um apontando para as especialidades certas.
6. **Equipe**: 4 cards com foto, nome, CRP, abordagem e uma frase pessoal (tudo placeholder).
7. **Como funciona**: 3 passos (Contato pelo WhatsApp → Conversa inicial/triagem → Início do acompanhamento).
8. **Dúvidas frequentes** (acordeão): sigilo, duração das sessões, online x presencial, convênio/reembolso, como funciona a avaliação neuropsicológica, a partir de que idade atende.
9. **Contato/Rodapé**: mapa (placeholder), endereço, horários, WhatsApp, Instagram, CRP do responsável técnico, aviso "Em caso de emergência, ligue 188 (CVV) ou 192 (SAMU)".
- **Botão flutuante de WhatsApp** em todas as telas.

## 4. Identidade visual
- Base: a logo, com **azul-céu (#2EAAF5 aprox.)**, **branco** e **amarelo** (miolo das flores) como cor de destaque, usado com moderação.
- No site, suavizar: fundos claros (branco/off-white e azul bem claro), azul da marca nos destaques e botões, amarelo só em detalhes.
- Tipografia: uma manuscrita elegante só para detalhes (ecoando o "Ser Você" da logo) + uma sans-serif arredondada e legível para o texto (ex.: Nunito, Quicksand ou DM Sans).
- Motivos visuais: flores e borboleta em traço fino branco/azul, formas orgânicas, cantos arredondados, bastante respiro.
- Clima: acolhedor, calmo, humano, leve. **Evitar**: visual hospitalar, cérebros genéricos de banco de imagem, cores frias e duras.
## 4.1 Movimento e interatividade (o site tem que ser CHAMATIVO)
O site precisa ter vida: elementos que se movem **de acordo com a rolagem da página**, não só fade simples. Use **GSAP + ScrollTrigger** (e Lenis para rolagem suave). Obrigatório:
- **Hero com camadas em parallax**: flores, folhas e a borboleta em traço fino se movendo em velocidades diferentes conforme o scroll e reagindo levemente ao mouse no desktop.
- **Borboleta-guia**: uma borboleta (SVG da identidade) que "voa" pela página acompanhando a rolagem, pousando em cada seção. É o fio condutor visual da ideia de "florescer".
- **Flores que desabrocham**: ilustrações SVG que se abrem (stroke draw + scale) quando a seção entra na tela.
- **Headline com revelação palavra por palavra** no carregamento (ouvir → acolher → florescer em destaque).
- **Seção "Como funciona" com scroll pinado**: a seção fica fixa e os 3 passos avançam com a rolagem, com uma linha/caule que cresce ligando os passos.
- **Cards de especialidade** com hover em profundidade (leve tilt 3D, elevação, troca de ilustração) e entrada escalonada (stagger).
- **Contadores animados** (ex.: "4 especialidades", "1 lugar para cuidar de toda a família").
- **Transição de cor de fundo** suave entre seções conforme o scroll (branco → azul claríssimo → off-white).
- **Barra de progresso de leitura** no topo, na cor da marca.
- **Botão de WhatsApp flutuante** com pulso suave a cada alguns segundos e um balão de mensagem ("Posso te ajudar a escolher o atendimento?") que aparece após ~20s ou 50% da rolagem.
- Microinterações em todos os botões e links (magnetic hover nos CTAs principais).
- Tudo fluido a 60fps, leve no celular (menos camadas no mobile) e respeitando `prefers-reduced-motion` (desliga parallax e pin, mantém conteúdo).

## 4.2 Gatilhos psicológicos (persuasão ÉTICA, compatível com o CFP)
Aplique gatilhos de conversão, mas **sem manipulação** — psicologia não pode usar urgência falsa, escassez inventada, medo ou promessas. Use:
- **Identificação/espelhamento**: logo após o hero, uma seção "Você se reconhece?" com frases que o visitante pensa ("Sinto que estou sempre no limite", "Nossa relação virou só discussão", "Meu filho tem dificuldade na escola e não sei por quê"), cada uma levando à especialidade certa. É o principal gatilho do site.
- **Redução de risco/fricção**: "A primeira conversa é só para entender o que você precisa, sem compromisso" e "Você não precisa saber qual especialidade escolher — a gente te ajuda".
- **Microcompromisso**: mini-seletor interativo "Para quem é o atendimento?" (Para mim · Para o casal · Para meu filho) → mostra a especialidade indicada → botão de WhatsApp com mensagem já escrita.
- **Autoridade**: formação, abordagem e CRP de cada profissional em destaque; selo "Clínica de Psicologia Integrada".
- **Prova de cuidado (sem depoimentos)**: valores da clínica (sigilo, escuta sem julgamento, cuidado integrado) com ícones.
- **Pertencimento/acolhimento**: copy em segunda pessoa, calorosa ("Aqui você pode ser você").
- **Reciprocidade**: bloco com dicas/conteúdos do Instagram (cards linkando @clinica_servoce).
- **CTA repetido** ao fim de cada seção, sempre com texto de baixo esforço ("Conversar pelo WhatsApp", "Tirar uma dúvida").
- **Proibido**: contagem regressiva, "últimas vagas", depoimentos de pacientes, promessa de resultado, preço como chamariz, linguagem que gere medo.

## 5. Regras do Código de Ética do CFP (obrigatório)
- Sem promessas de cura ou de resultado.
- Sem depoimentos de pacientes.
- Sem exibir preço como propaganda.
- CRP de cada psicóloga visível.
- Linguagem ética, sem sensacionalismo nem diagnóstico.

## 6. Técnico
- Next.js (App Router) + Tailwind CSS + TypeScript + GSAP/ScrollTrigger + Lenis. Sem backend.
- Mobile first; testar em 390px, 768px e 1440px.
- Textos e dados da clínica centralizados em um arquivo (`src/content/clinica.ts`) para eu trocar fácil.
- Link do WhatsApp com mensagem pré-preenchida (número placeholder `55XXXXXXXXXXX`).
- SEO local: title, meta description, Open Graph com a logo, headings em ordem, alt nas imagens.
- Acessibilidade: contraste AA, foco visível, áreas de toque ≥ 44px.
- Ao final, rode o projeto, confira visualmente e me diga como publicar na Vercel.

## 7. Textos
Escreva todos os textos em português do Brasil, tom acolhedor e simples. Dê **2 opções de headline** para o hero.
