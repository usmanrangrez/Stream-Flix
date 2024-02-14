import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import SingleMovie from "./SingleMovie";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/watch/:id",
      element: <SingleMovie />,
    },
    {
      path: "*", // Catch-all route for unmatched paths
      element: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default Body;
