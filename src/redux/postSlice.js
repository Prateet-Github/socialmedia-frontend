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

// Like a post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      
      const res = await axios.post(
        `http://localhost:5001/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return { postId, likes: res.data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to like post");
    }
  }
);

// Unlike a post
export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      
      const res = await axios.post(
        `http://localhost:5001/api/posts/${postId}/unlike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return { postId, likes: res.data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to unlike post");
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
      })
      // In your postSlice extraReducers, add these:

.addCase(likePost.fulfilled, (state, action) => {
  const { postId, likes } = action.payload;

  // Feed posts
  const feedPost = state.items.find((p) => p._id === postId);
  if (feedPost) {
    feedPost.likesCount = likes;
  }

  // User profile posts
  const userPost = state.userPosts.find((p) => p._id === postId);
  if (userPost) {
    userPost.likesCount = likes;
  }
})
.addCase(unlikePost.fulfilled, (state, action) => {
  const { postId, likes } = action.payload;

  const feedPost = state.items.find((p) => p._id === postId);
  if (feedPost) {
    feedPost.likesCount = likes;
  }

  const userPost = state.userPosts.find((p) => p._id === postId);
  if (userPost) {
    userPost.likesCount = likes;
  }
})
      ;
  },
});

export default postSlice.reducer;