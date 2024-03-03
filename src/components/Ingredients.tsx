import React, { useState, useEffect } from "react";

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
        );
        const data = await response.json();
        // Filter out ingredients containing beef or pork
        const filteredIngredients = data.meals.filter(
          (ingredient) =>
            !ingredient.strIngredient.toLowerCase().includes("beef") &&
            !ingredient.strIngredient.toLowerCase().includes("pork") &&
            !ingredient.strIngredient.toLowerCase().includes("bacon")
        );
        setIngredients(filteredIngredients);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleShowMoreIngredients = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <center>
        <h2 className="heading text-[1.5rem]">Some Healthy Ingredients</h2>
        <br />
      </center>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center w-[90vw] mx-auto">
        {ingredients.slice(0, visibleCount).map((ingredient) => (
          <div
            key={ingredient.idIngredient}
            className="bg-green-300 p-4 rounded-xl text-center"
          >
            <p className="text-xl font-bold">{ingredient.strIngredient}</p>
          </div>
        ))}
      </div>
      {visibleCount < ingredients.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMoreIngredients}
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
