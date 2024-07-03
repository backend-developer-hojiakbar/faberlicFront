"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  fill?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  fill = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        fill
          ? "bg-main text-white border-none"
          : "bg-transparent text-dark-blue border border-main"
      } md:px-12 xl:px-6 px-4 py-3 font-bold uppercase hover:bg-main hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
