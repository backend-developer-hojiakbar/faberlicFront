export const metadata = {
  title: "Faberlic",
  description: "Faberlic | store",
};

import {
  NextIntlClientProvider,
  useMessages,
} from "next-intl";

import { Toaster } from "react-hot-toast";
import "../globals.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  params: {
    locale: "en" | "uz" | "ru";
  };
}

export default function AuthLayout({
  children,
  params: { locale },
}: Readonly<AuthLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
