import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

import unhealthyWords from "./danger.json";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [areas, setAreas] = useState<string[]>([]); // Added state for areas
  const [recipeNotFound, setRecipeNotFound] = useState<boolean>(false); // Added state for recipe not found

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await response.json();
        const uniqueIngredients = data.meals.map(
          (ingredient: { strIngredient: string }) => ingredient.strIngredient
        );
        const filteredIngredients = uniqueIngredients.filter(
          (ingredient) =>
            !unhealthyWords.some((word) =>
              ingredient.toLowerCase().includes(word.toLowerCase())
            )
        );
        setIngredients(filteredIngredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const data = await response.json();
        const categoryList = data.meals
          .map((category: { strCategory: string }) => category.strCategory)
          .filter(
            (category) => !["Beef", "Pork"].includes(category) // Exclude Beef and Pork from categories
          );
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchAreas = async () => {
      // Fetch areas function
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const data = await response.json();
        const areaList = data.meals.map(
          (area: { strArea: string }) => area.strArea
        );
        setAreas(areaList);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchIngredients();
    fetchCategories();
    fetchAreas(); // Call fetchAreas
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Fetch recipes based on selected options
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredients.join(
        ","
      )}&c=${selectedCategory}&a=${selectedArea}`
    );
    const data = await response.json();
    const filteredRecipes = data.meals
      ? data.meals.filter((recipe: any) => {
          const recipeIngredients = recipe.strIngredient
            ? recipe.strIngredient
                .split(",")
                .map((ingredient: string) => ingredient.trim().toLowerCase())
            : [];
          return !recipeIngredients.some((ingredient) =>
            unhealthyWords.some((word) =>
              ingredient.includes(word.toLowerCase())
            )
          );
        })
      : [];

    if (filteredRecipes.length === 0) {
      setRecipeNotFound(true);
    } else {
      setRecipes(filteredRecipes);
      setRecipeNotFound(false);
    }
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <center>
        <h2 className="heading text-[1.5rem]">Latest Healthy Recipes</h2>
        <br />
      </center>
      <div className="max-w-2xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ingredients" className="block font-medium text-lg">
              Select Ingredients:
            </label>
            <select
              id="ingredients"
              multiple
              value={selectedIngredients}
              onChange={(e) =>
                setSelectedIngredients(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            >
              {ingredients.map((ingredient) => (
                <option key={ingredient} value={ingredient}>
                  {ingredient}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <label htmlFor="category" className="block font-medium text-lg">
              Select Category:
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <label htmlFor="area" className="block font-medium text-lg">
              Select Area:
            </label>
            <select // Changed input to select for areas
              id="area"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
            >
              {areas.map(
                (
                  area // Mapping over areas
                ) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Search Recipes
          </button>
        </form>
        {recipeNotFound && <p className="text-red-500">Recipe not found.</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center w-[90vw] mx-auto">
        {recipes.map((recipe) => (
          <CardContainer key={recipe.idMeal} className="inter-var">
            <a href={`/recipes/${recipe.idMeal}`}>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {recipe.strMeal}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={recipe.strMealThumb}
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt={recipe.strMeal}
                  />
                </CardItem>
              </CardBody>
            </a>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default RecipeForm;
