import React from "react";

interface SubmitButtonProps {
  type?: "button" | "submit";
  text: string;
  onClick?: () => void;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ type = "button", text, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={`w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700 ${className}`}>
      {text}
    </button>
  );
};

export default SubmitButton;
