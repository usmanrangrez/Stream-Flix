import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const Body = () => {
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
  return <RouterProvider router={appRouter} />;
};

export default Body;
