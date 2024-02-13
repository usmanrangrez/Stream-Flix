import axios from "axios";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../stores/MovieSlice";
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        API_OPTIONS
      );
      const nowPlayingMovies = response?.data?.results;
      dispatch(addNowPlayingMovies(nowPlayingMovies));
    } catch (error) {
      console.error("Error fetching current movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
