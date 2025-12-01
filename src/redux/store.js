import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import postReducer from "./postSlice.js";
import publicUserReducer from "./userSlice.js";
import userSearchReducer from "./userSearchSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    publicUser: publicUserReducer,
     userSearch: userSearchReducer,
  },
});