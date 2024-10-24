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
    backgroundColor: disabled
      ? "#A0AEC0" 
      : connectionState === ConnectionState.Connected
      ? "#E53E3E" 
      : "#4299E1",
    color: disabled ? "#CBD5E0" : "white", 
    width: "100px", 
    height: "40px", 
    borderRadius: "8px", 
    boxShadow: disabled ? "none" : "0 4px 6px rgba(0, 0, 0, 0.1)", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer", 
    pointerEvents: disabled ? 'none' : 'auto' as React.CSSProperties['pointerEvents'], // 修复类型
    opacity: disabled ? 0.6 : 1, 
    transition: "all 0.3s ease",
  };

  return (
    <button
      className={`flex items-center justify-center text-sm active:scale-[0.98] ${className}`}
      style={buttonStyle} 
      disabled={disabled} // 将 disabled 传入按钮属性
      {...allProps}
    >
      {connectionState === ConnectionState.Connecting ? (
        <LoadingSVG /> 
      ) : connectionState === ConnectionState.Connected ? (
        <FiPhoneOff size={24} />
      ) : (
        <FiPhone size={24} />
      )}
      {children}
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
