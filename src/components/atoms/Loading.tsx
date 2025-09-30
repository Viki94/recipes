import React from "react";

interface LoadingProps {
  text: string;
}

const Loading: React.FC<LoadingProps> = ({ text }) => {
  return <p className="text-center text-lg font-semibold text-gray-700">{ text }</p>;
};

export default Loading;
