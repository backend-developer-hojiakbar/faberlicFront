import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from shared config
const locales = ["en", "uz", "ru"];

export default getRequestConfig(async ({ locale }) => {
  // validate that the incoming 'locale' parameter is valid
  if (!locales.includes(locale as "en" | "uz" | "ru")) notFound();


  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
