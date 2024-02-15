import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import MoviesReducer from "./MovieSlice";
import gptReducer from "./GptSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: MoviesReducer,
    gpt: gptReducer,
  },
});
