import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setUser } from "../stores/UserSlice";

// Components
import Header from "./Header";
import Spinner from "./Spinner";

// Assets
import background from "../assets/Background.jpg";
import { demoPhoto } from "../utils/constants";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignIn = (e) => {
    e.preventDefault();
    setIsSignIn(!isSignin);
    setErrorMessage(""); // Reset error message on form toggle
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const error = checkValidData(name, email, password);
    if (error) {
      setErrorMessage(error);
      setIsLoading(false); // Stop loading if there is an error
      return;
    }

    try {
      if (isSignin) {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        await updateProfile(user, { displayName: name, photoURL: demoPhoto });
      } else {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        await updateProfile(user, { displayName: name, photoURL: demoPhoto });
      }

      const { uid, displayName, photoURL } = auth.currentUser;
      dispatch(setUser({ uid, email, displayName, photoURL }));
      navigate("/browse");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
      navigate("/browse");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen w-screen bg-black flex justify-center items-center">
        <Spinner />;
      </div>
    );

  return (
    <div>
      <Header />
      <div className="relative">
        <img
          className="w-full h-screen object-cover"
          src={background}
          alt="Background"
        />
        <form
          onSubmit={handleSubmit}
          className="absolute text-white max-w-md w-full p-10 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 bg-opacity-80"
        >
          <h1 className="text-3xl font-bold mb-4">
            {isSignin ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 my-2 rounded-md bg-gray-200 w-full text-black"
              ref={nameRef}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="p-3 my-2 rounded-md bg-gray-200 w-full text-black"
            ref={emailRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-2 rounded-md bg-gray-200 w-full text-black"
            ref={passwordRef}
            required
          />
          {errorMessage && (
            <p className="text-red-500 font-bold text-lg py-2">
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            className="p-3 my-2 bg-red-600 text-white font-bold rounded-md w-full"
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
          {isSignin ? (
            <p className="py-2 font-bold ">
              New to Netflix?{" "}
              <button className="underline" onClick={toggleSignIn}>
                SignUp
              </button>
            </p>
          ) : (
            <p className="py-2 font-bold ">
              Already a user?{" "}
              <button className="underline" onClick={toggleSignIn}>
                SignIn
              </button>
            </p>
          )}
          <button
            type="button"
            className="p-3 my-2 bg-blue-500 text-white font-bold rounded-md w-full"
            onClick={signInWithGoogle}
          >
            Sign In/Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
