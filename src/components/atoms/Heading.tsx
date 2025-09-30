import React from "react";

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{title}</h1>;
};

export default Heading;
