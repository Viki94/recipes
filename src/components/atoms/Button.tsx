import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md font-semibold transition ${disabled ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
