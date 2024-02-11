import React, { useState } from "react";
import logo from "../assets/Logo.webp";
import userIcon from "../assets/usericon.png";
import { useDispatch } from "react-redux";
import { clearUser } from "../utils/UserSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="absolute flex justify-between z-[100] w-screen px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-44 h-20 rounded-lg" src={logo} alt="Logo" />
      {/* Hover area now includes both the icon/arrow and the Sign Out button */}
      <div
        className="flex flex-col items-center justify-center gap-2"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center justify-center gap-2">
          <img className="h-8 cursor-pointer" src={userIcon} alt="User-Icon" />
          <p className="cursor-pointer font-extrabold text-xl">
            {isHovering ? "↑" : "↓"}
          </p>
        </div>
        {/* Conditionally render the Sign Out button within the same hover area */}
        {isHovering && (
          <button
            onClick={handleSignOut}
            className="whitespace-nowrap rounded-[4px] bg-black text-white py-2 px-4"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
