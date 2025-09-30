import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaRegHeart, FaHeart, FaTimes } from "react-icons/fa";
import IconButton from "../atoms/IconButton";
import { useAuth } from "../../../contexts/AuthContext";
import axios from 'axios';

interface RecipeItemProps {
    recipe: any;
    setRecipes?: React.Dispatch<React.SetStateAction<any[]>>;
    type?: "recipes" | "favorites";
    currentPage: number;
    recipesPerPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  }

  const RecipeItem: React.FC<RecipeItemProps> = ({
    recipe,
    setRecipes,
    type,
    currentPage,
    recipesPerPage,
    setCurrentPage,
    setTotalPages
  }) => {
    const navigate = useNavigate();
    const { token, userId, role } = useAuth();

    const handleDelete = async () => {
      if (!token.length) {
        navigate('/not-authorized');
        return;
      }

      try {
        await axios.delete(`http://localhost:5000/api/recipes/${recipe._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const response = await axios.get(`http://localhost:5000/api/recipes?page=${currentPage}&limit=${recipesPerPage}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecipes?.(response.data.recipes);
        setTotalPages?.(response.data.totalPages);

        if (response.data.recipes.length === 0 && currentPage > 1) {
          setCurrentPage(prevPage => prevPage - 1);
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
      }
    };

    const handleFavoriteClick = async () => {
        if (!token.length) {
          navigate("/user/login");
          return;
        }

        setRecipes?.((prevRecipes) =>
          prevRecipes.map((r) =>
            r._id === recipe._id
              ? {
                  ...r,
                  favoritedBy: r.favoritedBy?.includes(userId)
                    ? r.favoritedBy.filter((id: string) => id !== userId)
                    : [...(r.favoritedBy || []), userId],
                }
              : r
            )
        );

        try {
          await axios.post(
            `http://localhost:5000/api/recipes/${recipe._id}/favorite`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (type === "favorites") {
            const response = await axios.get(
              `http://localhost:5000/api/users/${userId}/favorites?page=${currentPage}&limit=${recipesPerPage}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
    
            setRecipes?.(response.data.favorites);
            setTotalPages?.(response.data.totalPages);
    
            // 🔥 If last item on the page is deleted, move to the previous page
            if (response.data.favorites.length === 0 && currentPage > 1) {
              setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
            }
          }
        } catch (error) {
          console.error("Error updating favorites:", error);
        }
      };

    return (
        <li className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h2
              onClick={() => navigate(`/recipe/${recipe._id}`)}
              className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
            >
              {recipe.title}
            </h2>
            {type === "recipes" && <p className="text-gray-600">Created by: {recipe.author}</p>}
          </div>

          <div className="flex space-x-3">
            {type === "recipes" && (recipe.author === userId || role === "admin") && (
              <>
                <IconButton
                  icon={<FaEdit size={24} />}
                  onClick={() => navigate(`/recipe/edit/${recipe._id}`)}
                  className="text-blue-600 hover:text-blue-800"
                />
                <IconButton
                  icon={<FaTrash size={24} />}
                  onClick={handleDelete}
                  className="text-red-600 hover:text-red-800"
                />
              </>
            )}

            {type === "recipes" && (
              <IconButton
                icon={recipe.favoritedBy?.includes(userId) ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                onClick={handleFavoriteClick}
                className="text-green-600 hover:text-green-800"
              />
            )}

            {type === "favorites" && (
              <IconButton icon={<FaTimes size={24} />}
              onClick={handleFavoriteClick}
              className="text-red-600 hover:text-red-800"/>
            )}
          </div>
        </li>
      );
    };

export default RecipeItem;

