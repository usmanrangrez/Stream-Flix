import React from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const SingleMovie = () => {
  // Extract the movie ID from the URL parameters
  const { id } = useParams();

  // Placeholder for fetching movie details based on `id` or other logic

  return (
    <div>
      <Header />
      {/* Example placeholder content showing how to use the `id` */}
      <h1>Movie Details Page</h1>
      <p>Showing details for movie ID: {id}</p>
      {/* Eventually, you'll replace the above with actual movie details */}
    </div>
  );
};

export default SingleMovie;
