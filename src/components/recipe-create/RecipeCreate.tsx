// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRecipes } from '../../../contexts/RecipesContext';
// import { useAuth } from '../../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const RecipeCreate = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     instructions: '',
//     prepTime: 0,
//     cookTime: 0,
//     servings: 1,
//     difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
//     category: '',
//     tags: '',
//   });

//   const [ingredients, setIngredients] = useState<{ name: string; weight: string }[]>([
//     { name: '', weight: '' },
//   ]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const { setRecipes } = useRecipes();
//   const { userId, token } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token.length) {
//       navigate('/not-authorized');
//       return;
//     }
//   }, [token, navigate]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleIngredientChange = (index: number, field: string, value: string) => {
//     let updatedIngredients = ingredients.map((ingredient, i) =>
//       i === index ? { ...ingredient, [field]: value } : ingredient
//     );

//     const lastIngredient = updatedIngredients[updatedIngredients.length - 1];
//     if (lastIngredient.name.trim() !== '' && lastIngredient.weight.trim() !== '') {
//       updatedIngredients.push({ name: '', weight: '' });
//     }

//     updatedIngredients = updatedIngredients.filter((ingredient, i) => {
//       return (
//         i === updatedIngredients.length - 1 ||
//         ingredient.name.trim() !== '' ||
//         ingredient.weight.trim() !== ''
//       );
//     });

//     setIngredients(updatedIngredients);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     let validationErrors: string[] = [];
//     let ingredientErrors: string[] = [];

//     if (!formData.title.trim()) validationErrors.push('Title is required.');
//     if (!formData.description.trim()) validationErrors.push('Description is required.');
//     if (!formData.instructions.trim()) validationErrors.push('Instructions are required.');

//     const hasValidIngredients = ingredients.some(
//       (ingredient) => ingredient.name.trim() && ingredient.weight.trim()
//     );

//     ingredients.forEach((ingredient, index) => {
//       if (index !== ingredients.length - 1 || ingredient.name.trim() || ingredient.weight.trim()) {
//         if (!ingredient.name.trim()) {
//           ingredientErrors.push(`Ingredient name is required for ingredient ${index + 1}.`);
//         }
//         if (!ingredient.weight.trim()) {
//           ingredientErrors.push(`Ingredient weight is required for ingredient ${index + 1}.`);
//         }
//       }
//     });

//     if (!hasValidIngredients && ingredientErrors.length === 0) {
//       validationErrors.push('At least one ingredient with both name and weight is required.');
//     }

//     validationErrors = [...validationErrors, ...ingredientErrors];

//     if (validationErrors.length > 0) {
//       setErrorMessage(validationErrors.join(' '));
//       return;
//     }

//     const recipeData = {
//       ...formData,
//       ingredients: ingredients.filter((ingredient) => ingredient.name.trim() && ingredient.weight.trim()),
//       totalTime: formData.prepTime + formData.cookTime,
//       tags: formData.tags.split(',').map((tag) => tag.trim()),
//       author: userId || 'Unknown',
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/api/recipes', recipeData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 201) {
//         setSuccessMessage('Recipe created successfully!');
//         setErrorMessage('');
//         setRecipes((prevRecipes) => [...prevRecipes, response.data]);

//         setFormData({
//           title: '',
//           description: '',
//           instructions: '',
//           prepTime: 0,
//           cookTime: 0,
//           servings: 1,
//           difficulty: 'Easy',
//           category: '',
//           tags: '',
//         });
//         setIngredients([{ name: '', weight: '' }]);

//         setTimeout(() => {
//           setSuccessMessage('');
//           navigate(`/recipe/${response.data._id}`);
//         }, 1000);
//       }
//     } catch (error) {
//       console.error('Error creating recipe:', error);
//       setErrorMessage('Failed to create recipe. Please try again.');
//       setSuccessMessage('');
//       setTimeout(() => setErrorMessage(''), 3000);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create a New Recipe</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 font-medium">Title:</label>
//           <input type="text" name="title" value={formData.title} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Description:</label>
//           <textarea name="description" value={formData.description} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Ingredients:</label>
//           {ingredients.map((ingredient, index) => (
//             <div key={index} className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
//               <input type="text" placeholder="Ingredient name" value={ingredient.name}
//                 onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
//                 className="w-full sm:w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//               <input type="text" placeholder="Weight (e.g., 100g)" value={ingredient.weight}
//                 onChange={(e) => handleIngredientChange(index, 'weight', e.target.value)}
//                 className="w-full sm:w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//             </div>
//           ))}
//         </div>


//         <div>
//           <label className="block text-gray-700 font-medium">Instructions:</label>
//           <textarea name="instructions" value={formData.instructions} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Prep Time (minutes):</label>
//           <input type="number" name="prepTime" value={formData.prepTime} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Cook Time (minutes):</label>
//           <input type="number" name="cookTime" value={formData.cookTime} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Servings:</label>
//           <input type="number" name="servings" value={formData.servings} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Difficulty:</label>
//           <select name="difficulty" value={formData.difficulty} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500">
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Category:</label>
//           <input type="text" name="category" value={formData.category} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <div>
//           <label className="block text-gray-700 font-medium">Tags (comma separated):</label>
//           <input type="text" name="tags" value={formData.tags} onChange={handleChange}
//             className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500" />
//         </div>

//         <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg cursor-pointer hover:bg-blue-700">
//           Create Recipe
//         </button>
//       </form>

//       {successMessage && <p className="text-green-600 font-medium mt-4">{successMessage}</p>}
//       {errorMessage && <p className="text-red-600 font-medium mt-4">{errorMessage}</p>}
//     </div>
//   );
// };

// export default RecipeCreate;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecipes } from "../../../contexts/RecipesContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useRecipeFormValidation from "../../hooks/useRecipeFormValidation";
import RecipeForm from "../organisms/RecipeForm";
import Heading from "../atoms/Heading";
import Loading from "../atoms/Loading";
import Message from "../atoms/Message";

const RecipeCreate = () => {
  const { setRecipes } = useRecipes();
  const { userId, token } = useAuth();
  const navigate = useNavigate();
  const { errorMessage, setErrorMessage, successMessage, setSuccessMessage, validateRecipeForm } =
    useRecipeFormValidation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    category: "",
    tags: "",
  });

  const [ingredients, setIngredients] = useState<{ name: string; weight: string }[]>([
    { name: "", weight: "" },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token.length) {
      navigate("/not-authorized");
      return;
    }
  }, [token, navigate]);

  const handleIngredientChange = (index: number, field: "name" | "weight", value: string) => {
    setIngredients((prev) =>
      prev.map((ingredient, i) => (i === index ? { ...ingredient, [field]: value } : ingredient))
    );
  };

  const handleAddIngredient = (index: number) => {
    setIngredients((prev) => [
      ...prev.slice(0, index + 1),
      { name: "", weight: "" },
      ...prev.slice(index + 1),
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRecipeForm(formData, ingredients)) return;

    setLoading(true);

    const recipeData = {
      ...formData,
      ingredients: ingredients.filter((ing) => ing.name.trim() && ing.weight.trim()),
      totalTime: formData.prepTime + formData.cookTime,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      author: userId || "Unknown",
    };

    try {
      const response = await axios.post("http://localhost:5000/api/recipes", recipeData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        setSuccessMessage("Recipe created successfully!");
        setErrorMessage([]);
        setRecipes((prev) => [...prev, response.data]);

        setFormData({
          title: "",
          description: "",
          instructions: "",
          prepTime: 0,
          cookTime: 0,
          servings: 1,
          difficulty: "Easy",
          category: "",
          tags: "",
        });
        setIngredients([{ name: "", weight: "" }]);

        setTimeout(() => {
          setSuccessMessage("");
          navigate(`/recipe/${response.data._id}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      setErrorMessage(["Failed to create recipe. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <Heading title="Create a New Recipe" />
      {loading && <Loading text="Loading..." />}
      {!loading && (
        <RecipeForm
          formData={formData}
          setFormData={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          ingredients={ingredients}
          handleIngredientChange={handleIngredientChange}
          handleAddIngredient={handleAddIngredient}
          handleRemoveIngredient={handleRemoveIngredient}
          handleSubmit={handleSubmit}
          buttonText="Create Recipe"
        />
      )}

      {errorMessage.length > 0 && <Message message={errorMessage} type="error" />}
      {successMessage && <Message message={successMessage} type="success" />}
    </div>
  );
};

export default RecipeCreate;
