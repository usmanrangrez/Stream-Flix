import { TMDB_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-48 h-72 pr-4  ">
      <img src={TMDB_CDN_URL + movie?.poster_path} alt="Movie_Poster" />
    </div>
  );
};

export default MovieCard;
