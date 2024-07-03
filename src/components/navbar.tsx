// Navbar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Languages from "./languages";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { Categories } from "@/interfaces";
import Filter from "./filter";
import useLanguage from "@/hooks/use-languages";
import { useLocale, useTranslations } from "next-intl";
import { Inter, Urbanist } from "next/font/google";

const font = Inter({ subsets: ["latin"] });
//  Urbanist({ subsets: ["latin"] });
const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  const local = useLocale();
  const t = useTranslations("Navigation");
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FABERLIC_API}/product/category/`
        );
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  const language = useLanguage();
  return (
    <header className=" w-full  ">
      <div className=" px-[7%] bg-main flex relative items-center justify-between py-1">
        <Languages />
        <div className="text-white hidden  xl:flex gap-6">
          <Link href={"/"}>{t("Navbar.help")}</Link>
          <Link href="tel:+998973470016">
            {/* {t("Navbar.connect")} */}
            +998 97 347 00 16
          </Link>
        </div>
      </div>
      <div className="py-4 border-b xl:flex-row flex flex-col gap-y-6 justify-between px-[7%] items-center">
        <Filter placeholder={t("Navbar.placeholder")} />
        <Link href="/" className="text-3xl md:mr-12 font-medium text-dark-blue">
          Faberlic
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href={`/${local}/auth/login`}
            className="py-2 border-2 rounded-lg border-main px-4 text-main"
          >
            <User className="text-2xl" />
          </Link>
          <Link
            href={`/${local}/cart`}
            className="py-2 px-4 bg-main relative text-white hover:bg-opacity-90 rounded-lg"
          >
            <ShoppingBag />
          </Link>
        </div>
      </div>
      <div className="h-auto navigation-scroll py-2 w-auto flex  border-b overflow-x-scroll items-center">
        {categories.map((category) => (
          <Link
            className={`${font.className} text-main mx-4 md:text-2xl font-semibold`}
            href={`/${local}/category/${category.id}`}
            key={category.id}
          >
            <div
              className="uppercase"
              dangerouslySetInnerHTML={{
                __html: category?.translations[language.language].name
                  .split(" ")
                  .join("&nbsp;"),
              }}
            />

            {/* {category.translations[language.language].name
              .toUpperCase()
              .split(" ")
              .join()} */}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
