import React, { useEffect, useState } from "react";
import logo from "../assets/Logo.webp";
import userIcon from "../assets/usericon.png";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { clearUser, setUser } from "../utils/UserSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(auth.currentUser); // Use state to store the logged-in user

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        setLoggedInUser(user); // Update local state
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(clearUser());
        setLoggedInUser(null); // Clear local state
        navigate("/");
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Determine if the current route is not the homepage
  const isNotHome = location.pathname !== "/";

  return (
    <div className="absolute flex justify-between items-center z-[100] w-screen px-8 py-2 bg-gradient-to-b from-black">
      <img className="w-44 h-20 rounded-lg" src={logo} alt="Logo" />
      {loggedInUser && (
        <p className="text-red-800 text-lg font-bold">
          Welcome, {loggedInUser.displayName || "Guest"}
        </p>
      )}
      {isNotHome && (
        <div
          className="flex flex-col items-center justify-center gap-2"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="flex items-center justify-center gap-2">
            <img
              className="h-8 cursor-pointer"
              src={loggedInUser?.photoURL || userIcon}
              onError={(e) => (e.target.src = userIcon)}
              alt="User Icon"
            />
            <p className="cursor-pointer font-extrabold text-xl">
              {isHovering ? "↑" : "↓"}
            </p>
          </div>
          {isHovering && (
            <button
              onClick={handleSignOut}
              className="whitespace-nowrap rounded-[4px] font-bold bg-black text-white py-2 px-4"
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
