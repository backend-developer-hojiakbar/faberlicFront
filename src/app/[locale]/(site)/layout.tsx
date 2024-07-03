import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider, useMessages } from "next-intl";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Faberlic",
  description: "Faberlic | Store",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: "en" | "uz" | "ru";
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true} className={montserrat.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
