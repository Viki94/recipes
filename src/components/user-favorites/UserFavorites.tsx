// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { FaTimes } from 'react-icons/fa';

// const UserFavorites = () => {
//   const { token, userId } = useAuth();
//   const navigate = useNavigate();
//   const [favorites, setFavorites] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       navigate('/not-authorized');
//       return;
//     }

//     if (token && userId) {
//       axios.get(`http://localhost:5000/api/users/${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(response => {
//         if (response.data.favorites) {
//           setFavorites(response.data.favorites);
//         }
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching favorites:', error);
//         setLoading(false);
//       });
//     }
//   }, [token, userId, navigate]);

//   const handleRemoveFavorite = async (id: string) => {
//     try {
//       await axios.post(`http://localhost:5000/api/recipes/${id}/favorite`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setFavorites(prevFavorites => prevFavorites.filter(recipe => recipe._id !== id));
//     } catch (error) {
//       console.error('Error removing favorite:', error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Favorite Recipes</h1>
//       {loading ? (
//         <p className="text-center text-lg font-semibold text-gray-700 animate-pulse">
//           Loading favorites...
//         </p>
//       ) : favorites.length > 0 ? (
//         <ul className="space-y-4">
//           {favorites.map(recipe => (
//             <li key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center">
//               <div>
//                 <h2
//                   onClick={() => navigate(`/recipe/${recipe._id}`)}
//                   className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
//                 >
//                   {recipe.title}
//                 </h2>
//               </div>
//               <button
//                 onClick={() => handleRemoveFavorite(recipe._id)}
//                 className="text-red-600 hover:text-red-800 transition-transform duration-200 transform hover:scale-110 cursor-pointer px-2 py-1 rounded-md font-bold text-sm"
//               >
//                 <FaTimes size={24} />
//               </button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-center text-xl font-semibold text-gray-600">No favorite recipes yet.</p>
//       )}
//     </div>
//   );
// };

// export default UserFavorites;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Heading from "../atoms/Heading";
import Pagination from "../molecules/Pagination";
import RecipeList from "../organisms/RecipeList";
import Loading from "../atoms/Loading";

const UserFavorites = () => {
  const { token, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const recipesPerPage = 3;
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    if (!token) {
      navigate("/not-authorized");
      return;
    }

    if (!userId) return;

    setLoading(true);
    axios
      .get(`http://localhost:5000/api/users/${userId}/favorites?page=${currentPage}&limit=${recipesPerPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.favorites && response.data.favorites.length > 0) {
          setRecipes(response.data.favorites);
          setTotalPages(response.data.totalPages);
        } else {
          setRecipes([]);
          setTotalPages(1);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching favorite recipes:", error);
        setLoading(false);
      });

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("page", String(currentPage));
    navigate(`?${newSearchParams.toString()}`, { replace: true });

  }, [currentPage, token, userId, navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {loading ? (
        <Loading text="Loading favorite recipes..." />
      ) : recipes.length > 0 ? (
        <>
          <Heading title="My Favorite Recipes" />
          <RecipeList
            recipes={recipes}
            setRecipes={setRecipes}
            type="favorites"
            currentPage={currentPage}
            recipesPerPage={recipesPerPage}
            setCurrentPage={setCurrentPage}
            setTotalPages={setTotalPages}
          />
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </>
      ) : (
        <Heading title="There are no favorite Recipes" />
      )}
    </div>
  );
};

export default UserFavorites;
