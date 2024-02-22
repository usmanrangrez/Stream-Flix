import React, { useRef } from "react";
import { useSelector } from "react-redux";
import useGptMoviesDetails from "../hooks/useGptMoviesDestails"; // Correct the hook's path if needed
import MovieCard from "./MovieCard"; // Import the MovieCard component

const GptSuggestions = () => {
  useGptMoviesDetails(); // Fetch movie details based on recommended movies
  const movieDetails = useSelector((state) => state.gpt.movieDetails);
  const scrollRef = useRef(null);

  return (
    <div className="text-white p-4 relative">
      {movieDetails.length > 0 && (
        <h2 className="text-2xl mb-4 font-bold">
          We found a list of movies for you!
        </h2>
      )}
      <div className="flex overflow-hidden relative" ref={scrollRef}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {movieDetails?.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GptSuggestions;
