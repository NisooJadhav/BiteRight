import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

import unhealthyWords from "./danger.json";

function Superfood() {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const fetchRecipes = async () => {
    try {
      const categories = ["Kale", "Blueberries", "Avocado", "Quinoa"];
      const responses = await Promise.all(
        categories.map((category) =>
          fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`
          )
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      const combinedRecipes = [].concat(...data.map((d) => d.meals));

      const filteredRecipes = combinedRecipes.filter((recipe) => {
        const recipeDescription =
          `${recipe.strMeal} ${recipe.strInstructions}`.toLowerCase();
        return !unhealthyWords.some((word) => recipeDescription.includes(word));
      });

      filteredRecipes.sort(() => 0.5 - Math.random());
      setRecipes((prevRecipes) => [...filteredRecipes.slice(0, visibleCount)]);
    } catch (error) {
      console.error("Error fetching superfood recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [visibleCount]);

  const handleShowMoreRecipes = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <>
      <br />
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center w-[90vw] mx-auto">
        {recipes.slice(0, visibleCount).map((recipe) => (
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
      {visibleCount < recipes.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMoreRecipes}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
          <br />
        </div>
      )}
    </>
  );
}

export default Superfood;
