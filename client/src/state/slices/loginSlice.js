import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;

      state.isLoggedIn = true;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUser } = loginSlice.actions;
export default loginSlice.reducer;

export const useLoginState = () => {
  return useSelector((state) => state.login);
};
