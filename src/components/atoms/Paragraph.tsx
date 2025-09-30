import React from "react";

interface ParagraphProps {
  text: string;
  className?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({ text, className }) => {
  return <p className={`text-gray-600 mb-6 ${className}`}>{text}</p>;
};

export default Paragraph;
