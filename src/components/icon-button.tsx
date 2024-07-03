"use client";
import React, { MouseEventHandler, ReactElement } from "react";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactElement;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className = "",
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg md:text-lg text-sm flex items-center justify-center bg-white shadow-md p-2 hover:scale-110 transition ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
