import axios from "axios";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../stores/MovieSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useTrailerVideo = (movie_id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovieTrailer = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}/videos`,
          API_OPTIONS
        );
        const movieData = response?.data;
        const trailer = movieData?.results?.find(
          (res) => res?.type === "Trailer"
        );
        if (trailer) {
          dispatch(addTrailerVideo(trailer));
        }
      } catch (error) {}
    };

    getMovieTrailer();
  }, [movie_id]);
};

export default useTrailerVideo;
