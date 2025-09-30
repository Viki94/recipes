import React from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import IconButton from "../atoms/IconButton";
import { FaPlus, FaTrash } from "react-icons/fa";

interface IngredientsFieldProps {
  ingredients: { name: string; weight: string }[];
  handleIngredientChange: (index: number, field: "name" | "weight", value: string) => void;
  handleAddIngredient: (index: number) => void;
  handleRemoveIngredient: (index: number) => void;
}

const IngredientsField: React.FC<IngredientsFieldProps> = ({
  ingredients,
  handleIngredientChange,
  handleAddIngredient,
  handleRemoveIngredient,
}) => {
  return (
    <div>
      <Label htmlFor="ingredients">Ingredients:</Label>
      <div className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
          >
            <div className="flex flex-col sm:flex-row w-full gap-2">
              {/* Name Input */}
              <Input
                type="text"
                name={`name-${index}`}
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                placeholder="Ingredient Name"
                className="w-full sm:w-1/2"
              />
              {/* Weight Input */}
              <Input
                type="text"
                name={`weight-${index}`}
                value={ingredient.weight}
                onChange={(e) => handleIngredientChange(index, "weight", e.target.value)}
                placeholder="Weight (e.g., 100g)"
                className="w-full sm:w-1/2"
              />
            </div>
            {/* Buttons always in the same row */}
            <div className="flex space-x-2">
              <IconButton
                type="button"
                icon={<FaPlus />}
                onClick={() => handleAddIngredient(index)}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 transition"
              />
              {ingredients.length > 1 && (
                <IconButton
                  type="button"
                  icon={<FaTrash />}
                  onClick={() => handleRemoveIngredient(index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsField;
