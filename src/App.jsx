// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./utils/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import { setUser, clearUser } from "./utils/UserSlice";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  const appRouter = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
    ],
    {
      errorElement: <ErrorPage />,
    }
  );

  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}>
        <AuthStateListener />
      </RouterProvider>
    </Provider>
  );
};

// Component to listen for Firebase auth state changes
const AuthStateListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        // User is signed out
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [dispatch]);

  return null; // This component does not render anything
};

export default App;
