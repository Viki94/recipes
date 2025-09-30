import React from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface DropdownButtonProps {
  onClick: () => void;
  isOpen: boolean;
  label: string;
  icon?: JSX.Element;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onClick, isOpen, label, icon }) => {
  return (
    <button
      className="flex items-center px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
      {isOpen ? <IoMdArrowDropup size={14} className="ml-2" /> : <IoMdArrowDropdown size={14} className="ml-2" />}
    </button>
  );
};

export default DropdownButton;
