import React from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const generatePagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const beforeCurrent = currentPage - 1;
      const afterCurrent = currentPage + 1;

      if (currentPage === 1) {
        pages.push(2, 3);
      } else if (currentPage === totalPages) {
        pages.push(totalPages - 2, totalPages - 1);
      } else {
        if (beforeCurrent > 1) pages.push(beforeCurrent);
        pages.push(currentPage);
        if (afterCurrent < totalPages) pages.push(afterCurrent);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (pages[pages.length - 1] !== totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-center space-y-2 md:space-y-0 md:space-x-2 mt-6">

      <div className="hidden md:flex space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAnglesLeft />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAngleLeft />
        </button>
      </div>

      <div className="flex flex-wrap justify-center space-x-2">
        {generatePagination().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`px-3 py-2 rounded-md font-semibold transition cursor-pointer ${
                page === currentPage ? "bg-blue-700 text-white" : "bg-gray-200 hover:bg-blue-500"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-2 text-gray-500 font-semibold">
              {page}
            </span>
          )
        )}
      </div>

      <div className="hidden md:flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAngleRight />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAnglesRight />
        </button>
      </div>

      <div className="flex justify-center space-x-2 mt-2 md:hidden">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAnglesLeft />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAngleLeft />
        </button>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAngleRight />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md font-semibold transition ${
            currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <FaAnglesRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
