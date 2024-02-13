import axios from "axios";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../stores/MovieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        API_OPTIONS
      );
      const data = response?.data?.results;
      dispatch(addTopRatedMovies(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
