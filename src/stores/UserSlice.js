import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: null,
  reducers: {
    setUser: (_state, action) => {
      return action.payload;
    },
    clearUser: (_state) => {
      return null;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;

export default UserSlice.reducer;
