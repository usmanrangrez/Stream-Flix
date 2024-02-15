import axios from "axios";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../stores/MovieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        API_OPTIONS
      );
      const data = response?.data?.results;
      dispatch(addPopularMovies(data));
    } catch (error) {}
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
