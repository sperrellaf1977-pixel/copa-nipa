import "./globals.css";

export const metadata = {
  title: "Copa Nipa Fatorial Investimentos XP 2026",
  description: "O melhor torneio de futebol society da Barra da Tijuca. 6 times, 7 sábados, agosto a setembro de 2026.",
  openGraph: {
    title: "Copa Nipa Fatorial Investimentos XP 2026",
    description: "O melhor torneio de futebol society da Barra da Tijuca. 6 times, 7 sábados, agosto a setembro de 2026.",
    url: "https://www.copanipa.com.br",
    siteName: "Copa Nipa",
    images: [
      {
        url: "https://www.copanipa.com.br/logo-nipa.jfif",
        width: 1200,
        height: 1200,
        alt: "Copa Nipa Fatorial Investimentos XP 2026",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copa Nipa Fatorial Investimentos XP 2026",
    description: "O melhor torneio de futebol society da Barra da Tijuca.",
    images: ["https://www.copanipa.com.br/logo-nipa.jfif"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
