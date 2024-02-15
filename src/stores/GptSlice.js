import { createSlice } from "@reduxjs/toolkit";

const GptSlice = createSlice({
  name: "gpt",
  initialState: {
    recommendedMovies: [], // Assuming this will hold the names or IDs of the movies
    movieDetails: [], // New state to hold detailed information about each movie
  },
  reducers: {
    setRecommendedMovies: (state, action) => {
      state.recommendedMovies = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
  },
});

export const { setRecommendedMovies, setMovieDetails } = GptSlice.actions;
export default GptSlice.reducer;
