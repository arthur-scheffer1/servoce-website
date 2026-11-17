import type { Metadata, Viewport } from "next";
import { Nunito, Parisienne } from "next/font/google";
import "./globals.css";
import { clinica } from "@/content/clinica";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const titulo = `${clinica.nomeCompleto} | Psicologia em ${clinica.cidade}`;
const descricao = `Psicoterapia TCC para adultos, avaliação neuropsicológica (TDAH, TEA), psicopedagogia e terapia de casal em ${clinica.cidade}. Agende uma conversa pelo WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(clinica.siteUrl),
  title: titulo,
  description: descricao,
  keywords: [
    "psicóloga",
    "psicologia integrada",
    "terapia cognitivo-comportamental",
    "avaliação neuropsicológica",
    "TDAH",
    "TEA",
    "psicopedagoga",
    "terapia de casal",
    clinica.cidade,
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: clinica.nomeCompleto,
    title: titulo,
    description: descricao,
    images: [
      { url: "/brand/og.jpg", width: 1200, height: 630, alt: "Logo da Ser Você – Clínica de Psicologia Integrada" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/brand/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2eaaf5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${parisienne.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
