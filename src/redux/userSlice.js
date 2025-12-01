import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USER_API = "http://localhost:5001/api/users";

export const fetchPublicProfile = createAsyncThunk(
  "user/fetchPublicProfile",
  async (username, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${USER_API}/public/${username}`);
      return res.data; // { user, posts }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "publicUser",
  initialState: {
    profile: null,
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.user;
        state.posts = action.payload.posts;
      })
      .addCase(fetchPublicProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;