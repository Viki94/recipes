import { useState } from "react";

const useRecipeFormValidation = () => {
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const validateRecipeForm = (formData: any, ingredients: any) => {
    let validationErrors: string[] = [];
    let ingredientErrors: string[] = [];

    if (!formData.title.trim()) validationErrors.push("Title is required.");
    if (!formData.description.trim()) validationErrors.push("Description is required.");
    if (!formData.instructions.trim()) validationErrors.push("Instructions are required.");

    const hasValidIngredients = ingredients.some(
      (ingredient: any) => ingredient.name.trim() && ingredient.weight.trim()
    );

    ingredients.forEach((ingredient: any, index: number) => {
      if (index !== ingredients.length - 1 || ingredient.name.trim() || ingredient.weight.trim()) {
        if (!ingredient.name.trim()) {
          ingredientErrors.push(`Ingredient name is required for ingredient ${index + 1}.`);
        }
        if (!ingredient.weight.trim()) {
          ingredientErrors.push(`Ingredient weight is required for ingredient ${index + 1}.`);
        }
      }
    });

    if (!hasValidIngredients && ingredientErrors.length === 0) {
      validationErrors.push("At least one ingredient with both name and weight is required.");
    }

    validationErrors = [...validationErrors, ...ingredientErrors];

    if (validationErrors.length > 0) {
      setErrorMessage(validationErrors);
      return false;
    }

    return true;
  };

  return { errorMessage, setErrorMessage, successMessage, setSuccessMessage, validateRecipeForm };
};

export default useRecipeFormValidation;
