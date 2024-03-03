import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setRecipeDetails(data.meals[0]);
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipeDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-[15vh]">
      <a href="/" className="text-sky-500 bg-sky-100 p-2 text-lg rounded-full">
        ← back
      </a>
      <h1 className="text-3xl font-bold text-center mb-4">
        {recipeDetails.strMeal}
      </h1>
      <div className="flex w-[70vw] items-center">
        <img
          src={recipeDetails.strMealThumb}
          alt=""
          className="w-[30vw] h-auto rounded-lg shadow-lg cover"
        />
        <div className="mt-6 w-[30vw] m-1">
          <iframe
            className="w-[30vw] aspect-video"
            src={`https://www.youtube.com/embed/${
              recipeDetails.strYoutube.split("v=")[1]
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <center>
            <br />
            <h2 className="text-xl font-semibold">
              Category:{" "}
              <span className="font-normal">{recipeDetails.strCategory}</span>
            </h2>
            <h2 className="text-xl font-semibold">
              Cuisine:{" "}
              <span className="font-normal">{recipeDetails.strArea}</span>
            </h2>
          </center>
        </div>
      </div>
      <div className="mt-4">
        <div>
          <h2 className="text-xl font-semibold">Ingredients:</h2>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 9 }).map((_, index) => {
              const ingredientKey = `strIngredient${index + 1}`;
              const measureKey = `strMeasure${index + 1}`;
              const ingredient = recipeDetails[ingredientKey];
              const measure = recipeDetails[measureKey];

              return ingredient ? (
                <div key={index} className="bg-gray-200 p-2 rounded">
                  {ingredient} - {measure}
                </div>
              ) : null;
            })}
          </div>
        </div>
        <br />
        <h2 className="text-xl font-semibold">Instructions:</h2>
        <p className="text-justify mt-2">{recipeDetails.strInstructions}</p>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center mt-4 gap-4">
        <a
          href={recipeDetails.strSource}
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Recipe Source
        </a>
      </div>
    </div>
  );
};

export default RecipeDetails;