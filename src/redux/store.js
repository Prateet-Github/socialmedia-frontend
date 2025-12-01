import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import postReducer from "./postSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});