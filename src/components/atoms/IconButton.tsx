import React from "react";

interface IconButtonProps {
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  icon: JSX.Element;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, type, icon, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`transition-transform transform cursor-pointer hover:scale-110 ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
