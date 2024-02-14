import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.webp";

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span>StreamFlix</span>
        </div>
        <nav>
          <Link
            to="https://github.com/usmanrangrez/Stream-Flix"
            target="_blank"
            className="mx-2 hover:underline"
          >
            About
          </Link>
          <Link
            to="https://www.linkedin.com/in/usman-rangrez-125a07ab/"
            target="_blank"
            className="mx-2 hover:underline"
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className="text-center mt-4">
        <p>Developed By Usmaan Rangrez</p>
      </div>
    </footer>
  );
};

export default Footer;
