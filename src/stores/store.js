import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import MoviesReducer from "./MovieSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: MoviesReducer,
  },
});
