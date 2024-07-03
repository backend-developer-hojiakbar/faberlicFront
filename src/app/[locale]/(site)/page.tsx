"use client";
import Button from "@/components/button";
import Feature from "@/components/feature";
import Gender from "@/components/gender";
import Hero from "@/components/hero";
import ProductCard from "@/components/product-card";
import useGender from "@/hooks/use-gender";
import { Products } from "@/interfaces";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";

const HomePage = () => {
  let gender = useGender();

  const [lastProduct, setLastProduct] = useState<Products[]>([]);
  const filteringData = lastProduct.filter((filt) =>
    gender.gender === ""
      ? filt
      : filt.translations.en?.tag.toLowerCase() === gender.gender
  );

  // console.log();

  const t = useTranslations("IndexPage");

  useEffect(() => {
    const fetching = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_FABERLIC_API}/product/product-filterGet/`
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const products: Products[] = await res.json();

        setLastProduct(products);

        // console.log(lastProduct);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetching();
  }, []);

  return (
    <div>
      <Hero />

      <div className="my-6 px-[8%]">
        <div className="md:h-56 bg-[url(/sincee.png)] h-24 bg-contain bg-no-repeat flex justify-around items-center">
          {/* <div className="flex flex-col justify-center items-start">
            <h2 className="text-5xl font-bold uppercase my-4 ">
              up to 80% off.
            </h2>
            <Button onClick={handle} fill>
              Salom
            </Button>
          </div> */}
          {/* <div className="bg-main w-36 h-36 flex items-center justify-center p-4 rounded-full">
            <h2 className="uppercase text-white italic inline">
              trusted since 1997
            </h2>
          </div> */}
        </div>
      </div>
      <section className="text-gray-600 px-[7%] body-font">
        <div className="container px-5 flex justify-between  mx-auto">
          <span className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-2">
            {t("new-products")}
          </span>
          <span className="sm:text-xl text-2xl font-medium title-font text-center text-gray-900 mb-2">
            <Gender maxs />
          </span>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 grid-cols-2 md:gap-6 gap-2 items-center">
          {filteringData.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <Feature />
    </div>
  );
};

export default HomePage;
