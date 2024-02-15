import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import {
  addSingleMovieDetails,
  addSingleMovieTrailer,
  resetSingleMovie,
} from "../stores/MovieSlice"; // Import your specific action creators

const useFetchSingleMovie = (movieId) => {
  const dispatch = useDispatch();

  // Function to fetch movie details
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        API_OPTIONS
      );
      const singleMovieData = response?.data;
      // Dispatch action to store movie details
      dispatch(addSingleMovieDetails(singleMovieData));
    } catch (error) {}
  };

  // Function to fetch movie trailer
  const fetchMovieTrailer = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS
      );
      const trailers = response?.data?.results;
      const singleMovieTrailer = trailers.find(
        (trailer) => trailer.type === "Trailer"
      );

      dispatch(addSingleMovieTrailer(singleMovieTrailer));
    } catch (error) {}
  };

  useEffect(() => {
    if (movieId) {
      dispatch(resetSingleMovie());
      fetchMovieDetails();
      fetchMovieTrailer();
    }
  }, [movieId]);
};

export default useFetchSingleMovie;
