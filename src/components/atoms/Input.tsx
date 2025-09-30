import React from "react";

interface InputProps {
  type: string;
  name: string;
  value: string | number;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, name, value, placeholder, className, onChange }) => {
  return <input type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} className={`w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500${className ?? ''}`} />;
};

export default Input;
