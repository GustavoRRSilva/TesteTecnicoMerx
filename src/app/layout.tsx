// app/layout.tsx
import { Inter } from "next/font/google";
import "../styles/global.scss";
import Header from "@/componentes/Header";
import Footer from "@/componentes/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marvel Comics",
  description: "Created By Gustavo Rodrigues",
  icons: {
    icon: "/shield.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      <Footer/>
      </body>
    </html>
  );
}
