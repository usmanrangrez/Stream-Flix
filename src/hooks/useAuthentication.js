import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { clearUser, setUser } from "../stores/UserSlice";

const useAuthentication = () => {
  const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);
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
        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(clearUser());
        setLoggedInUser(null); // Clear local state
        if (location.pathname !== "/") {
          navigate("/");
        }
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

  return { loggedInUser, handleSignOut };
};

export default useAuthentication;
