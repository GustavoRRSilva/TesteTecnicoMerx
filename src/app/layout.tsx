import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import Header from "@/componentes/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Comics",
  description: "Created By Gustavo Rodrigues",
  icons: {
    icon: "/Shield.png", // Caminho para o seu favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
