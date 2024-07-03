"use client";

import IconButton from "@/components/icon-button";
import CustomImage from "@/components/image";
import useLanguage from "@/hooks/use-languages";
import { Products } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetailedPage: React.FC<Props> = ({ params: { id } }: Props) => {
  const lang = useLanguage();
  const toastT = useTranslations("Toasts");

  const fetchProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_FABERLIC_API}/product/product-filterGet/${id}/`
      );

      const product: Products = await res.json();
      return product;
    } catch (error) {
      console.log(error);
      notFound();
      // return null;
    }
  };

  const handleClick = async () => {
    const product = await fetchProduct();
    if (!product) return;

    const products: Products[] = JSON.parse(
      localStorage.getItem("carts") || "[]"
    );

    const updatedProducts = products.map((p) =>
      p.id === product?.id ? { ...p, quantity: p.quantity + 1 } : p
    );

    if (products.find((p) => p.id === product?.id)) {
      localStorage.setItem("carts", JSON.stringify(updatedProducts));
    } else {
      localStorage.setItem(
        "carts",
        JSON.stringify([...products, { ...product, quantity: 1 }])
      );
    }

    toast.success(toastT("succCart"));
  };

  const renderProductDetails = (product: Products) => {
    const formattedPrice = new Intl.NumberFormat("en-US").format(product.price);
    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <CustomImage product={product} />
        <div className="divide-2">
          <div className="space-y-2 pb-8">
            <h1 className="text-2xl md:text-4xl font-bold">
              {product.translations[lang.language].name}
            </h1>
            <h2 className="text-black text-xl opacity-50 md:text-2xl font-bold">
              {product.translations[lang.language].short_description}
            </h2>
            <h2 className="text-gray-500 text-xl md:text-3xl font-bold">
              {formattedPrice}
            </h2>
          </div>
          <div className="pt-8">
            <div
              className="text-xs md:text-sm"
              dangerouslySetInnerHTML={{
                __html: product?.translations[lang.language].description,
              }}
            />
          </div>
          <IconButton
            onClick={handleClick}
            icon={<ShoppingCart />}
            className="border mt-4"
          />
        </div>
      </div>
    );
  };

  const [product, setProduct] = React.useState<Products | null>(null);

  React.useEffect(() => {
    fetchProduct().then((product) => setProduct(product));
  }, [product, setProduct, fetchProduct]);

  return product ? renderProductDetails(product) : null;
};

export default ProductDetailedPage;
