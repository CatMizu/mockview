import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...allProps
}) => {
  return (
    <button
      className={`flex flex-row ${
        disabled ? "pointer-events-none" : ""
      } text-gray-950 text-sm justify-center border border-transparent bg-red-500 px-3 py-1 rounded-md transition ease-out duration-250 hover:bg-transparent hover:shadow-red hover:border-red-500 hover:text-red-500 active:scale-[0.98] ${className}`}
      {...allProps}
    >
      {children}
    </button>
  );
};
