import React from "react";
import RecipeItem from "./RecipeItem";

interface RecipeListProps {
  recipes: any[];
  setRecipes: React.Dispatch<React.SetStateAction<any[]>>;
  currentPage: number;
  recipesPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  type?: "recipes" | "favorites";
}

const RecipeList: React.FC<RecipeListProps> = ({
  recipes,
  setRecipes,
  type,
  currentPage,
  recipesPerPage,
  setCurrentPage,
  setTotalPages,
}) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe._id}
          recipe={recipe}
          setRecipes={setRecipes}
          type={type}
          currentPage={currentPage}
          recipesPerPage={recipesPerPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      ))}
    </ul>
  );
};

export default RecipeList;
