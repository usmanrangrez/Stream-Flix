import axios from "axios";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../stores/MovieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const getUpcomingMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
        API_OPTIONS
      );
      const data = response?.data?.results;
      dispatch(addUpcomingMovies(data));
    } catch (error) {}
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
