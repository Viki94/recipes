// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../../contexts/AuthContext';
// import { FaEdit, FaTrash, FaRegHeart, FaHeart } from 'react-icons/fa';
// import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

// const Recipes = () => {
//   const { token, userId, role } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [recipes, setRecipes] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const recipesPerPage = 10;
//   const [totalPages, setTotalPages] = useState(1);

//   const searchParams = new URLSearchParams(location.search);
//   const initialPage = parseInt(searchParams.get('page') || '1', 10);
//   const [currentPage, setCurrentPage] = useState(initialPage);

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`http://localhost:5000/api/recipes?page=${currentPage}&limit=${recipesPerPage}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then(response => {
//       setRecipes(response.data.recipes);
//       setTotalPages(response.data.totalPages);
//       setLoading(false);

//       if (currentPage > response.data.totalPages) {
//         setCurrentPage(response.data.totalPages || 1);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching recipes:', error);
//       setLoading(false);
//     });

//     const newSearchParams = new URLSearchParams(location.search);
//     newSearchParams.set('page', String(currentPage));
//     navigate(`?${newSearchParams.toString()}`, { replace: true });

//   }, [currentPage, token, navigate]);

//   const handleDelete = async (id: string) => {
//     if (!token.length) {
//       navigate('/not-authorized');
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       axios.get(`http://localhost:5000/api/recipes?page=${currentPage}&limit=${recipesPerPage}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(response => {
//         setRecipes(response.data.recipes);
//         setTotalPages(response.data.totalPages);

//         if (response.data.recipes.length === 0 && currentPage > 1) {
//           setCurrentPage(prevPage => prevPage - 1);
//         }
//       });

//     } catch (error) {
//       console.error('Error deleting recipe:', error);
//     }
//   };

//   const handleClick = (id: string) => {
//     navigate(`/recipe/${id}`);
//   };

//   const handleFavoriteClick = async (id: string) => {
//     if (!token.length) {
//       navigate('/user/login');
//       return;
//     }

//     try {
//       const response = await axios.post(`http://localhost:5000/api/recipes/${id}/favorite`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.favoritedBy) {
//         setRecipes(prevRecipes =>
//           prevRecipes.map(recipe =>
//             recipe._id === id
//               ? { ...recipe, favoritedBy: response.data.favoritedBy }
//               : recipe
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error updating favorites:', error);
//     }
//   };

//   const handlePageClick = (page: number) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//     }
//   };

//   const generatePagination = () => {
//     const pages: (number | string)[] = [];

//     if (totalPages <= 4) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);
//       if (currentPage > 3) {
//         pages.push('...');
//       }

//       const beforeCurrent = currentPage - 1;
//       const afterCurrent = currentPage + 1;

//       if (currentPage === 1) {
//         pages.push(2, 3);
//       } else if (currentPage === totalPages) {
//         pages.push(totalPages - 2, totalPages - 1);
//       } else {
//         if (beforeCurrent > 1) pages.push(beforeCurrent);
//         pages.push(currentPage);
//         if (afterCurrent < totalPages) pages.push(afterCurrent);
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push('...');
//       }

//       if (pages[pages.length - 1] !== totalPages) {
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
//       {loading ? (
//         <p className="text-center text-lg font-semibold text-gray-700">Loading recipes...</p>
//       ) : recipes.length > 0 ? (
//         <>
//           <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Recipes</h1>
//           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {recipes.map((recipe) => (
//               <li key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between space-y-3">
//                 <h2
//                   onClick={() => handleClick(recipe._id)}
//                   className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
//                 >
//                   {recipe.title}
//                 </h2>
//                 <p className="text-gray-600">Created by: {recipe.author}</p>

//                 <div className="flex justify-between items-center">
//                   <div className="flex space-x-3">
//                     {(recipe.author === userId || role === 'admin') && (
//                       <>
//                         <button
//                           onClick={() => navigate(`/recipe/edit/${recipe._id}`)}
//                           className="text-blue-600 hover:text-blue-800 transition-transform duration-200 transform hover:scale-110 cursor-pointer"
//                         >
//                           <FaEdit size={24} />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(recipe._id)}
//                           className="text-red-600 hover:text-red-800 transition-transform duration-200 transform hover:scale-110 cursor-pointer"
//                         >
//                           <FaTrash size={24} />
//                         </button>
//                       </>
//                     )}
//                     <button
//                       onClick={() => handleFavoriteClick(recipe._id)}
//                       className="text-green-600 hover:text-green-800 transition-transform duration-200 transform hover:scale-110 cursor-pointer"
//                     >
//                       {Array.isArray(recipe.favoritedBy) && recipe.favoritedBy.includes(userId) ? (
//                         <FaHeart size={24} />
//                       ) : (
//                         <FaRegHeart size={24} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {totalPages > 1 && (
//             <div className="flex flex-col md:flex-row items-center md:justify-center space-y-2 md:space-y-0 md:space-x-2 mt-6">
//               <div className="hidden md:flex space-x-2">
//                 <button
//                   onClick={() => handlePageClick(1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAnglesLeft />
//                 </button>

//                 <button
//                   onClick={() => handlePageClick(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAngleLeft />
//                 </button>
//               </div>

//                 <div className="flex flex-wrap justify-center space-x-2">
//                   {generatePagination().map((page, index) =>
//                     typeof page === 'number' ? (
//                       <button
//                         key={index}
//                         onClick={() => handlePageClick(page)}
//                         className={`px-3 py-2 rounded-md font-semibold transition cursor-pointer ${
//                           page === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 hover:bg-blue-500'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ) : (
//                       <span key={index} className="px-3 py-2 text-gray-500 font-semibold">
//                         {page}
//                       </span>
//                     )
//                   )}
//                 </div>

//               <div className="hidden md:flex space-x-2">
//                 <button
//                   onClick={() => handlePageClick(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAngleRight />
//                 </button>

//                 <button
//                   onClick={() => handlePageClick(totalPages)}
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAnglesRight />
//                 </button>
//               </div>

//               <div className="flex justify-center space-x-2 mt-2 md:hidden">
//                 <button
//                   onClick={() => handlePageClick(1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAnglesLeft />
//                 </button>

//                 <button
//                   onClick={() => handlePageClick(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAngleLeft />
//                 </button>

//                 <button
//                   onClick={() => handlePageClick(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAngleRight />
//                 </button>

//                 <button
//                   onClick={() => handlePageClick(totalPages)}
//                   disabled={currentPage === totalPages}
//                   className={`px-3 py-2 rounded-md font-semibold transition ${
//                     currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-800 cursor-pointer'
//                   }`}
//                 >
//                   <FaAnglesRight />
//                 </button>
//               </div>

//             </div>
//           )}
//         </>
//       ) : (
//         <h3 className="text-center text-xl font-semibold text-gray-600">There are no Recipes</h3>
//       )}
//     </div>
//   );
// };

// export default Recipes;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Heading from "../atoms/Heading";
import Pagination from "../molecules/Pagination";
import RecipeList from "../organisms/RecipeList";
import Loading from "../atoms/Loading";

const Recipes = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const recipesPerPage = 1;
  const [totalPages, setTotalPages] = useState(1);

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/recipes?page=${currentPage}&limit=${recipesPerPage}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRecipes(response.data.recipes);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });

    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("page", String(currentPage));
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  }, [currentPage, token, navigate]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      {loading ? (
        <Loading text="Loading recipes..." />
      ) : recipes.length > 0 ? (
        <>
          <Heading title="Recipes" />
          <RecipeList
            recipes={recipes}
            setRecipes={setRecipes}
            type="recipes"
            currentPage={currentPage}
            recipesPerPage={recipesPerPage}
            setCurrentPage={setCurrentPage}
            setTotalPages={setTotalPages}
          />
          {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
        </>
      ) : (
        <Heading title="There are no Recipes" />
      )}
    </div>
  );
};

export default Recipes;

