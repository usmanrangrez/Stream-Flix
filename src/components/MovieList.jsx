import { useRef } from "react";
import MovieCard from "./MovieCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200; // Adjust scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; // Adjust scroll amount as needed
    }
  };

  return (
    <div className="p-2  sm:p-6 relative">
      <h1 className="text-xl sm:text-3xl font-semibold pb-2 text-white">
        {title}
      </h1>
      <div
        className="flex overflow-x-hidden"
        ref={scrollRef}
        style={{ scrollBehavior: "smooth" }}
      >
        <button
          className="absolute top-[50%] left-0 transform -translate-y-1/2 bg-transparent text-white text-3xl z-10 transition-transform duration-300 hover:translate-x-2"
          onClick={scrollLeft}
        >
          <FaArrowLeft className="text-gray-300" />
        </button>
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard movie={movie} key={movie?.id} />
          ))}
        </div>
        <button
          className="absolute top-[50%] right-0 transform -translate-y-1/2 bg-transparent text-white text-3xl z-10 transition-transform duration-300 hover:translate-x-2"
          onClick={scrollRight}
        >
          <FaArrowRight className="text-gray-300" />
        </button>
      </div>
    </div>
  );
};

export default MovieList;
