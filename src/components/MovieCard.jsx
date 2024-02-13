import { TMDB_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-28 h-52 sm:w-48 sm:h-72 pr-3 sm:pr-4  ">
      <img src={TMDB_CDN_URL + movie?.poster_path} alt="Movie_Poster" />
    </div>
  );
};

export default MovieCard;
