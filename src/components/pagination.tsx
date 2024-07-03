"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  hasPrevPage: boolean;
  length: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasPrevPage,
  length,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "20";

  return (
    <div className="flex gap-2 justify-center items-center my-12 py-6">
      <button
        className="bg-main text-white rounded-lg p-2 disabled:bg-opacity-80 disabled:cursor-not-allowed"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <ChevronLeft />
      </button>

      <div>
        {page} / {Math.ceil(length / Number(per_page)) || 1}
      </div>

      <button
        className="bg-main text-white p-2 rounded-lg disabled:bg-opacity-80 disabled:cursor-not-allowed"
        disabled={
          Number(page) === Math.ceil(length / Number(per_page)) ||
          Math.ceil(length / Number(per_page)) === 0
        }
        onClick={() => {
          router.push(`?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default PaginationControls;
