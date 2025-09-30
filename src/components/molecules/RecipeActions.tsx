// import React from "react";
// import { useNavigate } from "react-router-dom";
// import IconButton from "../atoms/IconButton";
// import FavoriteButton from "../atoms/FavoriteButton";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useAuth } from "../../../contexts/AuthContext";
// import axios from 'axios';

// interface RecipeActionsProps {
//   recipe: any;
//   setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
// }

// const RecipeActions: React.FC<RecipeActionsProps> = ({ recipe, setRecipes }) => {
//   const { userId, role, token } = useAuth();
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/recipes/${recipe._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setRecipes((prevRecipes) => prevRecipes.filter((r) => r._id !== recipe._id));
//     } catch (error) {
//       console.error("Error deleting recipe:", error);
//     }
//   };

//   const handleFavoriteClick = async () => {
//     try {
//       const response = await axios.post(`http://localhost:5000/api/recipes/${recipe._id}/favorite`, {}, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data.favoritedBy) {
//         setRecipes((prevRecipes) =>
//           prevRecipes.map((r) => (r._id === recipe._id ? { ...r, favoritedBy: response.data.favoritedBy } : r))
//         );
//       }
//     } catch (error) {
//       console.error("Error updating favorites:", error);
//     }
//   };

//   return (
//     <div className="flex justify-between items-center">
//       <div className="flex space-x-3">
//         {(recipe.author === userId || role === "admin") && (
//           <>
//             <IconButton onClick={() => navigate(`/recipe/edit/${recipe._id}`)} icon={<FaEdit size={24} />} className="text-blue-600 hover:text-blue-800" />
//             <IconButton onClick={handleDelete} icon={<FaTrash size={24} />} className="text-red-600 hover:text-red-800" />
//           </>
//         )}
//         <FavoriteButton onClick={handleFavoriteClick} isFavorited={Array.isArray(recipe.favoritedBy) && recipe.favoritedBy.includes(userId)} />
//       </div>
//     </div>
//   );
// };

// export default RecipeActions;
