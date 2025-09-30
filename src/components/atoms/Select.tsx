import React from "react";

interface SelectProps {
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ name, value, options, onChange }) => {
  return (
    <select name={name} value={value} onChange={onChange} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
