import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the ingredient
  weight: { type: String, required: true }, // Weight or quantity of the ingredient (e.g., "100g", "2 cups")
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // Brief overview of the recipe
  ingredients: { type: [ingredientSchema], required: true }, // Array of ingredient objects
  instructions: { type: String, required: true }, // Step-by-step instructions
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the recipe
  prepTime: { type: Number }, // Preparation time in minutes
  cookTime: { type: Number }, // Cooking time in minutes
  totalTime: { type: Number }, // Total time in minutes
  servings: { type: Number }, // Number of servings
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true }, // Difficulty level
  category: { type: String }, // e.g., 'Dessert', 'Main Course', etc.
  cuisine: { type: String }, // e.g., 'Italian', 'Indian', 'Mexican'
  tags: [{ type: String }], // Additional tags like 'Vegetarian', 'Gluten-Free'
  image: { type: String },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  averageRating: { type: Number, default: 0 },
  favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
