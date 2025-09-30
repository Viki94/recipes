import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return <label className="block text-gray-700 font-medium" htmlFor={htmlFor}>{children}</label>;
};

export default Label;
