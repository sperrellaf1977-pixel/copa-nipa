import "./globals.css";

export const metadata = {
  title: "Copa Nipa",
  description: "Site oficial da Copa Nipa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}