"use client";

import { Products } from "@/interfaces";
import Image from "next/image";
import { FC, useState } from "react";

interface Props {
  product: Products;
  fill?: boolean;
}

const CustomImage: FC<Props> = ({ product, fill }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {fill ? (
        <Image
          src={product.images[0]?.image}
          fill
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`}
          onLoad={() => setIsLoading(false)}
          alt={product.translations.en.name}
        />
      ) : (
        <Image
          src={product.images[0]?.image}
          width={400}
          height={1000}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }`}
          onLoad={() => setIsLoading(false)}
          alt={product.translations.en.name}
        />
      )}
    </>
  );
};

export default CustomImage;
