import { useLocale } from "next-intl";
import { create } from "zustand";

interface LanguageProps {
  isOpen: boolean;
  language: "en" | "uz" | "ru";
  onOpen: () => void;
  changeLanguage: (lang: "en" | "uz" | "ru") => void;
  onClose: () => void;
}

const useLanguage = create<LanguageProps>((set) => ({
  isOpen: false,
  language: "en",
  onOpen: () => set({ isOpen: true }),
  changeLanguage: (lang: "en" | "uz" | "ru") =>
    set({ language: lang, isOpen: false }),

  onClose: () => set({ isOpen: false }),
}));

export default useLanguage;
