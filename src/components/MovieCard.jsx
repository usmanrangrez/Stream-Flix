import { NavLink } from "react-router-dom";
import { TMDB_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <NavLink
      onClick={() => console.log("hi")}
      to={`/watch/${movie.id}`}
      className="w-28 h-52 sm:w-48 sm:h-72 pr-3 sm:pr-4 cursor-pointer"
    >
      <img
        className="rounded-sm sm:rounded-md"
        src={`${TMDB_CDN_URL}${movie?.poster_path}`}
        alt="Movie Poster"
      />
    </NavLink>
  );
};

export default MovieCard;
