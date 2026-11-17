import Header from "@/components/Header";
import WhatsFlutuante from "@/components/WhatsFlutuante";
import RolagemSuave from "@/components/movimento/RolagemSuave";
import Ambiente from "@/components/movimento/Ambiente";
import BorboletaGuia from "@/components/movimento/BorboletaGuia";
import Hero from "@/components/secoes/Hero";
import Reconhece from "@/components/secoes/Reconhece";
import Sobre from "@/components/secoes/Sobre";
import Especialidades from "@/components/secoes/Especialidades";
import ParaQuem from "@/components/secoes/ParaQuem";
import Equipe from "@/components/secoes/Equipe";
import ComoFunciona from "@/components/secoes/ComoFunciona";
import Instagram from "@/components/secoes/Instagram";
import Duvidas from "@/components/secoes/Duvidas";
import Contato, { Rodape } from "@/components/secoes/Contato";
import { clinica, faq } from "@/content/clinica";

export default function Home() {
  // Dados estruturados (SEO local)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        name: clinica.nomeCompleto,
        slogan: clinica.slogan,
        url: clinica.siteUrl,
        image: `${clinica.siteUrl}/brand/og.jpg`,
        logo: `${clinica.siteUrl}/brand/logo-blue.png`,
        sameAs: [clinica.instagramUrl],
        // TODO: incluir address, telephone e openingHours quando os dados forem fornecidos
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.itens.map((f) => ({
          "@type": "Question",
          name: f.pergunta,
          acceptedAnswer: { "@type": "Answer", text: f.resposta },
        })),
      },
    ],
  };

  return (
    <>
      <RolagemSuave />
      <Ambiente />
      <Header />
      <main id="conteudo">
        <Hero />
        <Reconhece />
        <Sobre />
        <Especialidades />
        <ParaQuem />
        <Equipe />
        <ComoFunciona />
        <Instagram />
        <Duvidas />
        <Contato />
      </main>
      <Rodape />
      <BorboletaGuia />
      <WhatsFlutuante />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
