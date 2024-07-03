"use client";
import useFilter from "@/hooks/use-filter";
import useLanguage from "@/hooks/use-languages";
import { Categories } from "@/types";

interface BilboardProps {
  data: Categories[];
}

export const revalidate = 0;
const Billboard: React.FC<BilboardProps> = ({ data }) => {
  const filter = useFilter();

  // const dataImage = data[0]?.image.split("uz").join("uz/django");


  const language = useLanguage();
  return (
    <div
      className={`sm:p-6 ${
        filter.text && "hidden"
      } lg:p-8 rounded-xl overflow-hidden`}
    >
      <div
        style={{ backgroundImage: `url(${data[0]?.image})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center text-center items-center gap-y-8 ">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-3xl max-w-xs text-white">
            <div
              dangerouslySetInnerHTML={{
                __html: data[0]?.translations[language.language].description,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
