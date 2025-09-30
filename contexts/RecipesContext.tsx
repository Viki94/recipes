import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

type Ingredient = {
    name: string;
    weight: string;
};

type Rating = {
    user: string;
    rating: number;
    comment?: string;
    createdAt: string;
};

type Recipe = {
    _id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    instructions: string;
    author: string;
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    servings?: number;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category?: string;
    cuisine?: string;
    tags?: string[];
    image?: string;
    ratings?: Rating[];
    averageRating?: number;
    favoritedBy?: string[];
    createdAt: string;
    updatedAt: string;
};

type RecipesContextType = {
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    updateFavoriteStatus: (recipeId: string) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { token, userId } = useAuth();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipeResponse = await axios.get('http://localhost:5000/api/recipes');
                
                // Check if the response contains a valid array of recipes
                if (!recipeResponse.data || !Array.isArray(recipeResponse.data.recipes)) {
                    console.error("Invalid recipes data received:", recipeResponse.data);
                    return;
                }
        
                let favoriteIds: string[] = [];
                if (token && userId) {
                    const userResponse = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
        
                    if (userResponse.data.favorites) {
                        favoriteIds = userResponse.data.favorites.map((fav: any) => fav._id);
                    }
                }
        
                const updatedRecipes = recipeResponse.data.recipes.map((recipe: any) => ({
                    ...recipe,
                    favoritedBy: recipe.favoritedBy || [],
                }));
        
                setRecipes(updatedRecipes);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        
    }, [token, userId]); // Runs when token or userId changes

    const updateFavoriteStatus = async (recipeId: string) => {
        if (!token || !userId) return;

        try {
            const response = await axios.post(
                `http://localhost:5000/api/recipes/${recipeId}/favorite`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.favoritedBy) {
                setRecipes(prevRecipes =>
                    prevRecipes.map(recipe =>
                        recipe._id === recipeId
                            ? { ...recipe, favoritedBy: response.data.favoritedBy }
                            : recipe
                    )
                );
            }
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    return (
        <RecipesContext.Provider value={{ recipes, setRecipes, updateFavoriteStatus }}>
            {children}
        </RecipesContext.Provider>
    );
};

export const useRecipes = () => {
    const context = useContext(RecipesContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipesProvider');
    }

    return context;
};
