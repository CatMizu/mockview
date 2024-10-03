import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { FiPhone, FiPhoneOff } from "react-icons/fi"; // 使用 react-icons 中的电话图标
import { ConnectionState } from "livekit-client";

type ButtonProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  connectionState: ConnectionState;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  connectionState,
  ...allProps
}) => {
  const buttonStyle = {
    backgroundColor:
      connectionState === ConnectionState.Connected ? "red" : "green",
    color: "white",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  };

  return (
    <button
      className={`flex items-center justify-center text-sm transition ease-out duration-250 ${
        disabled ? "pointer-events-none" : ""
      } active:scale-[0.98] ${className}`}
      style={buttonStyle} 
      {...allProps}
    >
      {connectionState === ConnectionState.Connecting ? (
        <LoadingSVG /> 
      ) : connectionState === ConnectionState.Connected ? (
        <FiPhoneOff size={24} />
      ) : (
        <FiPhone size={24} />
      )}
    </button>
  );
};

// LoadingSVG 用于表示连接中状态的加载动画
const LoadingSVG = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8H4z"
    />
  </svg>
);
