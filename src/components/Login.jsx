import Header from "./Header";
import background from "../assets/Background.jpg";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/UserSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
  const [isSignin, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignIn = (e) => {
    e.preventDefault();
    setIsSignIn(!isSignin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //Validate Form Data
    const error = checkValidData(name, email, password);
    if (error) {
      setErrorMessage(error);
      return; // Stop the function if there is an error
    }

    if (isSignin) {
      // Sign in logic
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          // Signed in
          const user = userCredentials.user;
          updateProfile(user, {
            displayName: name,
            photoURL:
              "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.holychildfaridabad.com%2Fregister-alumni.php&psig=AOvVaw3O1uzRKDnS2gf5sdqzrh09&ust=1707751854916000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMDXrsfNo4QDFQAAAAAdAAAAABAJ",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth?.currentUser;
              dispatch(
                setUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error?.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign up logic
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          return updateProfile(user, {
            displayName: name,
            photoURL: "https://example.com/photo.jpg", // Ensure this URL is accessible and valid
          });
        })
        .then(() => {
          // After successfully updating the profile, manually fetch the updated user info
          const user = auth.currentUser;
          // Dispatch setUser action here with the updated user info
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
          navigate("/browse");
        })
        .catch((error) => {
          // Handle any errors that occur during account creation or profile update
          setErrorMessage(error.message);
        });
    }
  };

  // Function to handle Google Sign-In
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Dispatch setUser action with the user info
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        navigate("/browse");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error("Google sign in error", errorCode, errorMessage);
        // Optionally, set error message to display in the UI
        setErrorMessage(errorMessage);
      });
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
              required={true}
            />
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="p-3 my-2 rounded-md bg-gray-200 w-full text-black"
            ref={emailRef}
            required={true}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 my-2 rounded-md bg-gray-200 w-full text-black"
            ref={passwordRef}
            required={true}
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
          <button
            type="button"
            className="p-3 my-2 bg-blue-500 text-white font-bold rounded-md w-full"
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
