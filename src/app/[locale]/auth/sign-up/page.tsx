"use client";
import auth from "@/actions/auth";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const local = useLocale();
  const t = useTranslations("Register");
  const toastT = useTranslations("Toasts");
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const registerFun = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, first_name, last_name, password, password2 } = formData;

    if (password !== password2) {
      setError("Parol ikkalasi ham bir xil emas");
      toast.error(toastT(toastT("passwordError")));
      return;
    }

    try {
      await auth
        .signUp(email, first_name, last_name, password, password2)
        .then((result) => result.json())
        .then((req) => {
          console.log(req);
        });
      router.replace(`/${local}/auth/verify`);
      toast.success("Muvaffaqqiyatli kirish");
    } catch (err) {
      console.error("Error", err);
      toast.error("Xatolik sodir bo'ldi");
      setError("Xatolik sodir bo'ldi");
    }
  };

  return (
    <div className="grid place-items-center p-6 h-screen">
      <div className="shadow-lg w-full md:w-[400px] p-5 rounded-lg border-t-4 border-main">
        <h1 className="text-xl font-bold my-4">{t("title")}</h1>
        <form onSubmit={registerFun} className="flex flex-col gap-3">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            required
            placeholder={t("placeholders.first_name")}
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={handleChange}
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            required
            placeholder={t("placeholders.last_name")}
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            placeholder={t("placeholders.email")}
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            required
            placeholder={t("placeholders.password")}
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            value={formData.password2}
            required
            placeholder={t("placeholders.password2")}
            className="w-full border border-gray-200 py-2 px-6 bg-zinc-100/40"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-main text-white font-bold cursor-pointer px-6 py-2"
          >
            {t("btn")}
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 mt-2 rounded-md">
              {error}
            </div>
          )}
          <Link href={`/${local}/auth/login`}>
            {t("have")} <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
