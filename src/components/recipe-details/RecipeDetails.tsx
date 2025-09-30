import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { userId, token, role } = useAuth();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/recipes/${id}`)
        .then((response) => {
          setRecipe(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recipe details:', error);
          setError('Failed to load recipe details. Please try again.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (!token) {
      navigate('/not-authorized');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setError('Failed to delete the recipe. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/recipe/edit/${id}`);
  };

  if (loading) {
    return <p>Loading recipe details...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  const handleClick = () => {
    navigate('/');
  };

  const isAuthorized = recipe.author === userId || role === 'admin';

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <button onClick={handleClick} className="mb-4 text-blue-600 hover:underline flex items-center cursor-pointer">
        &larr; Back to Recipes
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2">
        <p><strong>Category:</strong> {recipe.category || 'N/A'}</p>
        <p><strong>Difficulty:</strong> {recipe.difficulty || 'N/A'}</p>
        <p><strong>Prep Time:</strong> {recipe.prepTime} minutes</p>
        <p><strong>Cook Time:</strong> {recipe.cookTime} minutes</p>
        <p><strong>Total Time:</strong> {recipe.totalTime} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Tags:</strong> {recipe.tags ? recipe.tags.join(', ') : 'N/A'}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients</h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient: { name: string; weight: string }, index: number) => (
            <li key={index}>
              <strong>{ingredient.name} </strong> - {ingredient.weight}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Instructions</h3>
        <p className="bg-gray-100 p-4 rounded-lg shadow-sm">{recipe.instructions}</p>
      </div>

      {isAuthorized && (
        <div className="flex justify-between mt-6">
          <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg cursor-pointer hover:bg-blue-700">
            Edit
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg cursor-pointer hover:bg-red-700">
            Delete
          </button>
        </div>
      )}
    </div>
  );

};

export default RecipeDetails;
