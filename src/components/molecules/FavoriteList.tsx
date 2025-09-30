import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

interface FavoriteListProps {
  favorites: any[];
  onRemoveFavorite: (id: string) => void;
}

const FavoriteList: React.FC<FavoriteListProps> = ({ favorites, onRemoveFavorite }) => {
  const navigate = useNavigate();

  return (
    <ul className="space-y-4">
      {favorites.map(recipe => (
        <li key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h2
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
            >
              {recipe.title}
            </h2>
          </div>
          <button
            onClick={() => onRemoveFavorite(recipe._id)}
            className="text-red-600 hover:text-red-800 transition-transform duration-200 transform hover:scale-110 cursor-pointer px-2 py-1 rounded-md font-bold text-sm"
          >
            <FaTimes size={24} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default FavoriteList;
