"use client";
import React from "react";
import useFilter from "@/hooks/use-filter";

const Filter = ({ placeholder }: { placeholder: string }) => {
  const filter = useFilter();

  const handleChange = (e: any) => {
    filter.onChange(e.target.value);
  };

  return (
    <div className="xl:w-[27%] bg-white border relative z-10 h-12 flex rounded-xl">
      <input
        onChange={handleChange}
        type="text"
        className="bg-transparent outline-none border-none w-full indent-3"
        placeholder={placeholder}
      />
      <div className="h-full flex justify-center items-center w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Filter;
