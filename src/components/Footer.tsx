import React from "react";
import logo from "../assets/logo.webp";

const Footer = () => {
  return (
    <div>
      <br />
      <footer className="bg-green-200 text-center lg:text-left">
        <div className="container p-6">
          <div className="flex justify-center items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <a href="/" className="flex items-center">
                <img src={logo} className="h-8 mr-2" alt="Logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  BiteRight
                </span>
              </a>
            </div>
            <div className="text-gray-700">
              <span>
                Made with <span className="text-red-600">&hearts;</span> by
                TheNxtBigThing
              </span>
            </div>
          </div>
        </div>
        <div className="text-white text-center p-4 bg-green-800">
          © 2024 BiteRight
        </div>
      </footer>
    </div>
  );
};

export default Footer;
