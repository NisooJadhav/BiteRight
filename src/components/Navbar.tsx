"use client";
import React, { useState } from "react";
import logo from "../assets/logo.png";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar />
    </div>
  );
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 inset-x-0 mx-auto z-50 p-4 flex justify-between items-center bg-white">
      <a href="/" className="shrink-0">
        <img src={logo} alt="Logo" className="w-40 h-auto md:w-50 md:h-auto" />
      </a>
      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex space-x-6 flex-col md:flex-row`}
      >
        <a
          href="/#recipes"
          className="text-gray-400 hover:text-black hover:font-medium transition-colors duration-300"
        >
          Recipes
        </a>
        <a
          href="/ingredients"
          className="text-gray-400 hover:text-black hover:font-medium transition-colors duration-300"
        >
          Ingredients
        </a>
        <a
          href="/news"
          className="text-gray-400 hover:text-black hover:font-medium transition-colors duration-300"
        >
          News
        </a>
        <a
          href="/find_recipe"
          className="text-gray-400 hover:text-black hover:font-medium transition-colors duration-300"
        >
          Find Recipe
        </a>
      </nav>
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-400 hover:text-black hover:font-medium focus:outline-none"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
