import React from "react";

interface TextAreaProps {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ name, value, placeholder, onChange }) => {
  return <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />;
};

export default TextArea;
