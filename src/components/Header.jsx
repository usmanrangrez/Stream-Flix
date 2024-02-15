import React, { useState } from "react";
import logo from "../assets/Logo.webp";
import userIcon from "../assets/usericon.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import useAuthentication from "../hooks/useAuthentication";
import { CiSearch } from "react-icons/ci";
const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { loggedInUser, handleSignOut } = useAuthentication();
  const location = useLocation();
  const navigate = useNavigate();

  const isNotHome = location.pathname !== "/";

  return (
    <div className="absolute flex justify-between items-center z-[100] w-screen px-8 py-2 bg-gradient-to-b from-black">
      <img
        className="w-8 h-8 sm:w-44 sm:h-20 rounded-lg cursor-pointer"
        src={logo}
        alt="Logo"
        onClick={() => navigate("/browse")}
      />
      {loggedInUser && (
        <p className="text-xs hidden sm:inline text-red-600 md:text-lg font-bold">
          Welcome, {loggedInUser.displayName || "Guest"}
        </p>
      )}
      {isNotHome && (
        <NavLink
          to={"/search"}
          className="text-white pr-10  flex gap-2 justify-center items-center"
        >
          <p>Search Guru</p>
          <CiSearch className="h-20 w-8" />
        </NavLink>
      )}
      {isNotHome && (
        <div
          className="flex flex-col items-center  justify-center gap-2"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center justify-center gap-2">
            <img
              className={`h-8 hidden sm:block cursor-pointer rounded-md`}
              src={loggedInUser?.photoURL || userIcon}
              onError={(e) => (e.target.src = userIcon)}
              alt="User Icon"
            />
            <p className="hidden sm:block cursor-pointer font-extrabold text-xl">
              {isHovering ? "↑" : "↓"}
            </p>
          </div>
          <button
            className="sm:hidden text-white text-[10px] absolute right-5"
            onClick={handleSignOut}
          >
            <FaSignOutAlt />
          </button>
          {isHovering && (
            <button
              onClick={handleSignOut}
              className="hidden sm:block whitespace-nowrap rounded-[4px] font-bold bg-black text-white py-2 px-4"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
