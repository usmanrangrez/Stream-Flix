import Header from "./Header";
import background from "../assets/Background.jpg";
import { useState } from "react";
import { useEffect } from "react";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);

  const toggleSignIn = (e) => {
    e.preventDefault();
    setIsSignIn(!isSignin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Header />
      <div className="relative">
        <img
          className="w-full h-screen object-cover"
          src={background}
          alt="Background"
        />
        <form className="absolute text-white max-w-md w-full p-10 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 bg-opacity-80">
          <h1 className="text-3xl font-bold mb-4">
            {isSignin ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignin && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 my-2 rounded-md bg-gray-200 w-full"
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-3 my-2 rounded-md bg-gray-200 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-2 rounded-md bg-gray-200 w-full"
          />
          <button
            type="submit"
            className="p-3 my-2 bg-red-600 text-white font-bold rounded-md w-full"
            onClick={handleSubmit}
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
          {isSignin && (
            <p className="py-2 font-bold ">
              New to Netflix?{" "}
              <button className="underline" onClick={toggleSignIn}>
                SignUp
              </button>
            </p>
          )}
          {!isSignin && (
            <p className="py-2 font-bold ">
              Already a user?{" "}
              <button className="underline" onClick={toggleSignIn}>
                SignIn
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
