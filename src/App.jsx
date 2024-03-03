import { NavbarDemo } from "./components/Navbar";
import News from "./components/News";
import RecipeDetails from "./components/RecipeDetails";
import Veg from "./components/Veg";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Ingredients from "./components/Ingredients";
import RecipeForm from "./components/RecipeForm";

export default function App() {
  return (
    <>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="z-100 fixed bottom-4 right-4 bg-black hover:bg-green-700 text-white font-bold p-2 rounded rounded-full"
      >
        ↑
      </button>
      <NavbarDemo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients" element={<Ingredients />} />

        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/news" element={<News />} />
        <Route path="/find_recipe" element={<RecipeForm />} />
      </Routes>
    </>
  );
}
