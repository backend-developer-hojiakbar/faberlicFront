"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useLanguage from "@/hooks/use-languages";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

interface LanguageProps {
  name: "en" | "uz" | "ru";
}

const languages: LanguageProps[] = [
  { name: "en" },
  { name: "uz" },
  { name: "ru" },
];

export default function Languages() {
  const localActive = useLocale();
  const [selected, setSelected] = useState<LanguageProps>(languages[0]);
  const language = useLanguage();
  const router = useRouter();

  const pathname = usePathname();
  const soz = pathname.split(`${localActive}`)[1] || "";

  const [active, setActive] = useState<"en" | "uz" | "ru">(
    localActive !== "en" && localActive !== "uz" && localActive !== "ru"
      ? "en"
      : localActive
  );

  useEffect(() => {
    if (localActive === "en") {
      setActive("en");
    } else if (localActive === "uz") {
      setActive("uz");
    } else if (localActive === "ru") {
      setActive("ru");
    } else {
      setActive("en");
    }
    language.changeLanguage(active);
  }, [selected, active, language, localActive, setActive]);

  return (
    <div className="md:w-24 w-20 z-50">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-main focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-main sm:text-sm">
            <span className="block truncate">{localActive.toUpperCase()}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {languages.map((language, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-7 ${
                      active ? "bg-main text-white" : "text-gray-900"
                    }`
                  }
                  value={language}
                  onClick={() => router.push(`/${language.name}/${soz}`)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {language.name.toUpperCase()}
                      </span>
                      {/* {localActive && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-main ">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )} */}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
