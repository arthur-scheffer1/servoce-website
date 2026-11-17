/**
 * ============================================================
 *  SER VOCÊ — CONTEÚDO DO SITE
 * ============================================================
 *  Todos os textos e dados da clínica ficam aqui.
 *
 *  ⚠️ Tudo que estiver entre [colchetes] é PLACEHOLDER:
 *  aparece destacado em amarelo no site até ser trocado.
 *  Basta substituir o texto (sem os colchetes) e salvar.
 * ============================================================
 */

export type EspecialidadeId = "tcc" | "neuro" | "psicopedagogia" | "sistemica";
export type PerfilId = "mim" | "casal" | "filho";

export const clinica = {
  nome: "Ser Você",
  nomeCompleto: "Ser Você – Clínica de Psicologia Integrada",
  selo: "Clínica de Psicologia Integrada",
  slogan: "Um espaço para ouvir, acolher e florescer.",

  /** Número no formato internacional, só dígitos: 55 + DDD + número */
  whatsapp: "55XXXXXXXXXXX",
  whatsappExibicao: "[(XX) XXXXX-XXXX]",
  mensagemPadrao: "Olá! Vim pelo site da Ser Você e gostaria de conversar sobre um atendimento.",

  instagram: "clinica_servoce",
  instagramUrl: "https://www.instagram.com/clinica_servoce/",

  cidade: "[Cidade – UF]",
  endereco: "[Rua, número – Bairro]",
  enderecoComplemento: "[Complemento / sala]",
  /** Link do Google Maps (botão "Como chegar") */
  mapaUrl: "",
  horarios: [
    { dias: "Segunda a sexta", horas: "[08h às 20h]" },
    { dias: "Sábado", horas: "[08h às 12h]" },
  ],
  modalidades: "[presencial e online]",
  convenios: "[Informar se atende convênios ou emite recibo para reembolso]",
  responsavelTecnico: {
    nome: "[Nome da responsável técnica]",
    crp: "[CRP 00/00000]",
  },

  /** Endereço do site publicado (para SEO). Trocar quando tiver domínio. */
  siteUrl: "https://servoce-website.vercel.app",
};

/* ---------------- HERO ---------------- */
/**
 * Duas opções de headline. Para trocar, mude `headlineAtiva` para "a" ou "b".
 * A: "Um espaço para ouvir, acolher e florescer." (o próprio slogan como título)
 * B: "Cuidado psicológico para toda a família, num lugar só." (escolhida)
 */
export const hero = {
  headlineAtiva: "b" as "a" | "b",
  headlines: {
    a: "Um espaço para ouvir, acolher e florescer.",
    b: "Cuidado psicológico para toda a família, num lugar só.",
  },
  subtitulo: `Psicoterapia, avaliação neuropsicológica, psicopedagogia e terapia de casal trabalhando juntas em ${clinica.cidade}. Atendimento ${clinica.modalidades}.`,
  ctaPrincipal: "Agendar uma conversa",
  ctaSecundario: "Conheça as especialidades",
  reducaoRisco: "A primeira conversa é só para entender o que você precisa, sem compromisso.",
};

/* ---------------- VOCÊ SE RECONHECE? ---------------- */
export const reconhece = {
  titulo: "Você se reconhece em alguma dessas frases?",
  intro: "Muita gente chega até nós sem saber direito o que está sentindo. Tudo bem. Comece por aqui.",
  frases: [
    { texto: "Sinto que estou sempre no limite.", especialidade: "tcc" },
    { texto: "Minha cabeça não desliga, nem na hora de dormir.", especialidade: "tcc" },
    { texto: "Nossa relação virou só discussão.", especialidade: "sistemica" },
    {
      texto: "Meu filho tem dificuldade na escola e eu não sei por quê.",
      especialidade: "psicopedagogia",
    },
    {
      texto: "Esqueço as coisas e não consigo manter a atenção.",
      especialidade: "neuro",
    },
    {
      texto: "Será que é TDAH? Será que é autismo? Queria ter clareza.",
      especialidade: "neuro",
    },
  ] as { texto: string; especialidade: EspecialidadeId }[],
  ajuda: "Você não precisa saber qual especialidade escolher — a gente te ajuda.",
};

export const seletor = {
  titulo: "Para quem é o atendimento?",
  opcoes: [
    {
      id: "mim",
      rotulo: "Para mim",
      indicacao: ["tcc", "sistemica", "neuro"],
      texto:
        "Para adultos, a porta de entrada costuma ser a psicoterapia. Se surgirem dúvidas sobre atenção ou memória, a avaliação neuropsicológica entra junto.",
      mensagem: "Olá! Estou buscando atendimento para mim e gostaria de entender qual especialidade faz mais sentido.",
    },
    {
      id: "casal",
      rotulo: "Para o casal",
      indicacao: ["sistemica"],
      texto:
        "A terapia sistêmica de casal olha para a relação como um todo: a comunicação, os acordos e o que cada um traz da própria história.",
      mensagem: "Olá! Gostaríamos de saber mais sobre a terapia de casal na Ser Você.",
    },
    {
      id: "filho",
      rotulo: "Para meu filho",
      indicacao: ["psicopedagogia", "neuro"],
      texto:
        "Para crianças e adolescentes, olhamos para a aprendizagem e o desenvolvimento juntos: psicopedagogia e, quando indicado, avaliação neuropsicológica.",
      mensagem: "Olá! Estou buscando atendimento para meu filho/minha filha e gostaria de orientação.",
    },
  ] as {
    id: PerfilId;
    rotulo: string;
    indicacao: EspecialidadeId[];
    texto: string;
    mensagem: string;
  }[],
};

/* ---------------- SOBRE ---------------- */
export const sobre = {
  titulo: "Psicologia integrada: diferentes olhares cuidando de você",
  paragrafos: [
    "Na Ser Você, psicólogas de diferentes especialidades trabalham lado a lado. Quando alguém chega, a equipe conversa entre si para pensar no cuidado como um todo, e não em partes soltas.",
    "Assim, um adulto em terapia, uma criança em avaliação e um casal em acompanhamento podem encontrar, no mesmo lugar, profissionais que se conhecem e trocam entre si — sempre com sigilo e com o seu consentimento.",
  ],
  fraseManuscrita: "Aqui você pode ser você.",
  numeros: [
    { valor: 4, sufixo: "", rotulo: "especialidades que conversam entre si" },
    { valor: 3, sufixo: "", rotulo: "perfis de atendimento: você, o casal e seu filho" },
    { valor: 1, sufixo: "", rotulo: "lugar para cuidar de toda a família" },
  ],
  valores: [
    {
      icone: "sigilo",
      titulo: "Sigilo",
      texto: "O que é dito aqui fica aqui. O sigilo é um dever ético de toda a equipe.",
    },
    {
      icone: "escuta",
      titulo: "Escuta sem julgamento",
      texto: "Você pode chegar do jeito que está. Ninguém aqui vai te julgar.",
    },
    {
      icone: "integrado",
      titulo: "Cuidado integrado",
      texto: "Especialidades que conversam entre si para olhar você por inteiro.",
    },
  ],
};

/* ---------------- ESPECIALIDADES ---------------- */
export const especialidades: {
  id: EspecialidadeId;
  nome: string;
  resumo: string;
  paraQuem: string;
  quandoProcurar: string[];
}[] = [
  {
    id: "tcc",
    nome: "Psicoterapia (TCC) para adultos",
    resumo:
      "Terapia Cognitivo-Comportamental: um trabalho prático e colaborativo para entender pensamentos, emoções e comportamentos.",
    paraQuem: "Adultos",
    quandoProcurar: [
      "Ansiedade, preocupação constante ou sensação de estar no limite",
      "Tristeza persistente ou desânimo",
      "Momentos de mudança, luto ou decisões difíceis",
    ],
  },
  {
    id: "neuro",
    nome: "Avaliação neuropsicológica",
    resumo:
      "Uma investigação cuidadosa de funções como atenção, memória e aprendizagem, que ajuda a entender o que está acontecendo.",
    paraQuem: "Crianças, adolescentes e adultos",
    quandoProcurar: [
      "Suspeita de TDAH ou TEA (autismo)",
      "Esquecimentos e dificuldade de concentração",
      "Dificuldades de aprendizagem que precisam de investigação",
    ],
  },
  {
    id: "psicopedagogia",
    nome: "Psicopedagogia",
    resumo:
      "Acompanhamento dos processos de aprendizagem, com estratégias pensadas para o jeito de cada criança aprender.",
    paraQuem: "Crianças e adolescentes",
    quandoProcurar: [
      "Dificuldade na leitura, escrita ou matemática",
      "Queda no rendimento ou desmotivação com a escola",
      "Orientação para a família e para a escola",
    ],
  },
  {
    id: "sistemica",
    nome: "Terapia sistêmica de casal e adultos",
    resumo:
      "Um olhar para as relações: como a pessoa ou o casal se comunica, se organiza e lida com o que vem da própria história.",
    paraQuem: "Casais e adultos",
    quandoProcurar: [
      "Conflitos frequentes ou distanciamento no casal",
      "Dificuldade de comunicação e de fazer acordos",
      "Questões familiares que pesam no dia a dia",
    ],
  },
];

/* ---------------- PARA QUEM É ---------------- */
export const perfis = {
  titulo: "Por onde começar",
  intro: "Escolha o caminho que mais parece com o seu momento.",
  itens: [
    {
      id: "mim",
      titulo: "Para você",
      texto: "Ansiedade, cansaço emocional, decisões difíceis ou vontade de se conhecer melhor.",
      especialidades: ["tcc", "neuro", "sistemica"],
    },
    {
      id: "casal",
      titulo: "Para o casal",
      texto: "Quando as conversas viram discussão, ou quando vocês querem fortalecer o que já existe.",
      especialidades: ["sistemica"],
    },
    {
      id: "filho",
      titulo: "Para seu filho",
      texto: "Dificuldades na escola, dúvidas sobre o desenvolvimento ou suspeita de TDAH e TEA.",
      especialidades: ["psicopedagogia", "neuro"],
    },
  ] as { id: PerfilId; titulo: string; texto: string; especialidades: EspecialidadeId[] }[],
};

/* ---------------- EQUIPE ---------------- */
export const equipe = {
  titulo: "Quem vai cuidar de você",
  intro: "Uma equipe de psicólogas com formações diferentes, que se encontram para pensar cada caso com cuidado.",
  pessoas: [
    {
      nome: "[Nome da psicóloga]",
      crp: "[CRP 00/00000]",
      funcao: "Psicóloga clínica",
      abordagem: "Terapia Cognitivo-Comportamental · Adultos",
      formacao: "[Formação e especializações]",
      frase: "[Uma frase pessoal sobre como ela enxerga o cuidado]",
      foto: "",
    },
    {
      nome: "[Nome da neuropsicóloga]",
      crp: "[CRP 00/00000]",
      funcao: "Neuropsicóloga",
      abordagem: "Avaliação neuropsicológica · Todas as idades",
      formacao: "[Formação e especializações]",
      frase: "[Uma frase pessoal sobre como ela enxerga o cuidado]",
      foto: "",
    },
    {
      nome: "[Nome da psicopedagoga]",
      crp: "[CRP ou registro profissional]",
      funcao: "Psicopedagoga",
      abordagem: "Aprendizagem · Crianças e adolescentes",
      formacao: "[Formação e especializações]",
      frase: "[Uma frase pessoal sobre como ela enxerga o cuidado]",
      foto: "",
    },
    {
      nome: "[Nome da psicóloga]",
      crp: "[CRP 00/00000]",
      funcao: "Psicóloga sistêmica",
      abordagem: "Terapia sistêmica · Casais e adultos",
      formacao: "[Formação e especializações]",
      frase: "[Uma frase pessoal sobre como ela enxerga o cuidado]",
      foto: "",
    },
  ],
};

/* ---------------- COMO FUNCIONA ---------------- */
export const comoFunciona = {
  titulo: "Como funciona o primeiro passo",
  intro: "Sem formulários longos. Você manda uma mensagem e a gente conduz o resto com calma.",
  passos: [
    {
      titulo: "Você manda uma mensagem",
      texto: "Pelo WhatsApp, do seu jeito. Pode ser só um “oi, queria entender como funciona”.",
    },
    {
      titulo: "Uma conversa inicial",
      texto: "Entendemos o que você está buscando e indicamos a profissional e a especialidade mais adequadas.",
    },
    {
      titulo: "Começa o acompanhamento",
      texto: "Vocês combinam dias e horários, presencial ou online, e o cuidado começa no seu ritmo.",
    },
  ],
};

/* ---------------- INSTAGRAM (reciprocidade) ---------------- */
export const instagramPosts = {
  titulo: "Conteúdos para o seu dia a dia",
  intro: `No Instagram @${clinica.instagram} compartilhamos reflexões e orientações gratuitas.`,
  /** Exemplos de temas — trocar pelos posts reais do perfil */
  posts: [
    { tema: "Ansiedade", titulo: "[Post] O que é ansiedade esperada e quando pedir ajuda" },
    { tema: "Família", titulo: "[Post] Como conversar com seu filho sobre a escola" },
    { tema: "Relacionamentos", titulo: "[Post] Pequenos acordos que fazem diferença no casal" },
  ],
};

/* ---------------- DÚVIDAS ---------------- */
export const faq = {
  titulo: "Dúvidas frequentes",
  itens: [
    {
      pergunta: "O que eu falar fica em sigilo?",
      resposta:
        "Sim. O sigilo é um dever previsto no Código de Ética Profissional do Psicólogo. O que você compartilha fica entre você e a profissional. Quando há troca entre especialidades da equipe, ela acontece apenas com o seu consentimento e com o que for necessário para o seu cuidado.",
    },
    {
      pergunta: "Quanto tempo dura cada sessão?",
      resposta:
        "As sessões de psicoterapia costumam durar cerca de 50 minutos, com frequência combinada entre você e a profissional. [Confirmar duração e frequência praticadas pela clínica.]",
    },
    {
      pergunta: "O atendimento é presencial ou online?",
      resposta:
        "[Confirmar: atendemos presencialmente em nosso espaço e também online, por videochamada.] O cuidado e o sigilo são os mesmos nas duas modalidades. Na conversa inicial vocês escolhem o que funciona melhor para você.",
    },
    {
      pergunta: "Vocês atendem convênio? Dá para pedir reembolso?",
      resposta: `${clinica.convenios} Pergunte pelo WhatsApp que explicamos como funciona no seu caso.`,
    },
    {
      pergunta: "Como funciona a avaliação neuropsicológica?",
      resposta:
        "Ela começa com uma entrevista inicial, segue com algumas sessões de testes e atividades e termina com uma devolutiva, em que os resultados são explicados com calma e entregues em um laudo. O número de sessões varia conforme a idade e a demanda de cada pessoa.",
    },
    {
      pergunta: "A partir de que idade vocês atendem?",
      resposta:
        "Atendemos crianças, adolescentes e adultos. A idade mínima depende da especialidade: [informar a idade mínima para psicopedagogia e avaliação neuropsicológica].",
    },
  ],
};

/* ---------------- CONTATO ---------------- */
export const contato = {
  titulo: "Vamos conversar?",
  texto:
    "Mande uma mensagem do jeito que for mais fácil para você. A gente responde com calma e te ajuda a encontrar o atendimento certo.",
  emergencia:
    "ligue 188 (CVV, 24 horas e gratuito) ou 192 (SAMU). Este site e o WhatsApp da clínica não são canais de atendimento de crise.",
};

/* ---------------- WHATSAPP FLUTUANTE ---------------- */
export const whatsFlutuante = {
  balao: "Posso te ajudar a escolher o atendimento?",
};

export const menu = [
  { href: "#sobre", rotulo: "Sobre" },
  { href: "#especialidades", rotulo: "Especialidades" },
  { href: "#equipe", rotulo: "Equipe" },
  { href: "#como-funciona", rotulo: "Como funciona" },
  { href: "#duvidas", rotulo: "Dúvidas" },
  { href: "#contato", rotulo: "Contato" },
];

export function nomeEspecialidade(id: EspecialidadeId) {
  return especialidades.find((e) => e.id === id)?.nome ?? "";
}
