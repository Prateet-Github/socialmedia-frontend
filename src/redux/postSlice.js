import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/posts"; // adjust if needed

// 🔹 Fetch feed: GET /api/posts/feed
export const fetchFeed = createAsyncThunk(
  "posts/fetchFeed",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.get(`${API_URL}/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // array of posts
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load feed"
      );
    }
  }
);

// 🔹 Create post: POST /api/posts  (content + image)

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.post(API_URL, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // DON'T set Content-Type manually for FormData
        },
      });

      return res.data; // created post
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create post"
      );
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue("Failed to load user posts");
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],        // feed posts
    userPosts: [],    // profile posts
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 fetchFeed
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload;
      })

      // 🔹 getUserPosts
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;