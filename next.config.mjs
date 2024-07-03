import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "faberlick.pythonanywhere.com",
      "faberliic.uz",
      "api.faberliic.uz",
      "fakestoreapi.com",
    ],
  },
};
export default withNextIntl(nextConfig);
