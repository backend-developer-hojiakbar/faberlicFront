"use client";
import useFilter from "@/hooks/use-filter";
import ProductCard from "./product-card";
import { Products } from "@/types";
import useLanguage from "@/hooks/use-languages";
import useGender from "@/hooks/use-gender";

interface EntriesProps {
  filterData: Products[];
  start?: number;
  end?: number;
}

const EntriesProduct: React.FC<EntriesProps> = ({ filterData, start, end }) => {
  const filter = useFilter();
  const language = useLanguage();
  let gender = useGender();


  const filteringData = filterData
    .slice(start, end)
    .filter((filt) =>
      gender.gender === ""
        ? filt
        : filt.translations.en?.tag.toLowerCase() === gender.gender
    );

  return (
    <div className="grid md:grid-cols-2 xl:gap-6 xl:grid-cols-4 grid-cols-2 gap-2 items-center">
      {filteringData
        .filter((entry) => {
          return filter.text.toLowerCase() === ""
            ? entry
            : entry.translations[language.language].name
                .toLowerCase()
                .includes(filter.text.toLowerCase()) ||
                entry.translations[language.language].short_description
                  .toLowerCase()
                  .includes(filter.text.toLowerCase());
        })
        .map((entry) => (
          <ProductCard key={entry.id} product={entry} />
        ))}
    </div>
  );
};

export default EntriesProduct;
