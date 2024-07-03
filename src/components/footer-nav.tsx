"use client";
import { Categories } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Categories[];
  footer?: boolean;
}

export const revalidate = 0;

const FooterNav: React.FC<MainNavProps> = ({ data }) => {
  const pathName = usePathname();
  return (
    <div className="my-4 w-full mx-auto  px-[7%]">
      <div className="flex justify-end gap-6">
        {data.map((category) => (
          <Link
            key={category.id}
            className={`text-xl font-semibold uppercase hover:text-white ${
              pathName === `/category/`
                ? "text-white"
                : "text-neutral-500"
            }`}
            href={'/'}
          >
            Assa
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterNav;
