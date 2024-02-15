import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { setMovieDetails } from "../stores/GptSlice";

const useGptMoviesDetails = () => {
  const dispatch = useDispatch();
  const recommended = useSelector((state) => state.gpt.recommendedMovies); // Adjust based on actual state path

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (recommended?.length > 0) {
        try {
          const movieDetailsPromises = await recommended.map((movieName) => {
            const url = `https://api.themoviedb.org/3/search/movie`;
            return axios
              .get(url, {
                ...API_OPTIONS,
                params: { ...API_OPTIONS.params, query: movieName },
              })
              .then((response) => response.data.results[0]); // Assuming you want the first result
          });

          const moviesDetails = await Promise.all(movieDetailsPromises);
          console.log(moviesDetails); // Debugging
          dispatch(setMovieDetails(moviesDetails));
        } catch (error) {
          console.error("Failed to fetch movie details", error);
        }
      }
    };

    fetchMovieDetails();
  }, [recommended, dispatch]);
};

export default useGptMoviesDetails;
