import React from "react";
import FormField from "../molecules/FormField";
import IngredientsField from "../molecules/IngredientsField";
import SubmitButton from "../atoms/SubmitButton";

interface RecipeFormProps {
    formData: any;
    setFormData: any;
    ingredients: any;
    handleIngredientChange: any;
    handleAddIngredient: (index: number) => void;
    handleRemoveIngredient: (index: number) => void;
    handleSubmit: any;
    buttonText: string;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
    formData,
    setFormData,
    ingredients,
    handleIngredientChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleSubmit,
    buttonText,
  }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" type="text" name="title" value={formData.title} placeholder="Title" onChange={setFormData} />
          <FormField label="Description" type="textarea" name="description" placeholder="Description" value={formData.description} onChange={setFormData} />
          <IngredientsField
            ingredients={ingredients}
            handleIngredientChange={handleIngredientChange}
            handleAddIngredient={handleAddIngredient}
            handleRemoveIngredient={handleRemoveIngredient}
          />
          <FormField label="Instructions" type="textarea" name="instructions" placeholder="Instructions" value={formData.instructions} onChange={setFormData} />
          <FormField label="Prep Time (minutes)" type="number" name="prepTime" placeholder="Prep Time (minutes)" value={formData.prepTime} onChange={setFormData} />
          <FormField label="Cook Time (minutes)" type="number" name="cookTime" placeholder="Cook Time (minutes)" value={formData.cookTime} onChange={setFormData} />
          <FormField label="Servings" type="number" name="servings" placeholder="Servings" value={formData.servings} onChange={setFormData} />
          <FormField label="Difficulty" type="select" name="difficulty" placeholder="Difficulty" value={formData.difficulty} onChange={setFormData} options={["Easy", "Medium", "Hard"]} />
          <FormField label="Category" type="text" name="category" placeholder="Category" value={formData.category} onChange={setFormData} />
          <FormField label="Tags (comma separated)" type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags} onChange={setFormData} />

          <SubmitButton type="submit" text={buttonText} />
        </form>
      );
};

export default RecipeForm;
