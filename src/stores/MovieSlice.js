import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "Movies",
  initialState: {
    trailerVideo: null, //this is for homepage trailer
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    singleMovie: {
      details: null,
      trailer: null,
    },
  },
  reducers: {
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addSingleMovieDetails: (state, action) => {
      state.singleMovie.details = action.payload;
    },
    addSingleMovieTrailer: (state, action) => {
      state.singleMovie.trailer = action.payload;
    },
    resetSingleMovie: (state) => {
      state.singleMovie = { details: null, trailer: null };
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addTopRatedMovies,
  addPopularMovies,
  addUpcomingMovies,
  addSingleMovieDetails,
  addSingleMovieTrailer,
  resetSingleMovie,
} = MovieSlice.actions;
export default MovieSlice.reducer;
