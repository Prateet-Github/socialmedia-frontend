import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

//Fetch feed: GET /api/posts/feed
export const fetchFeed = createAsyncThunk(
  "posts/fetchFeed",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(`/posts/feed`, {
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

// Create post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.post("/posts", formData, {
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

// Get posts by user
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/user/${userId}`);
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
      
      const res = await api.post(
        `/posts/${postId}/like`,
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
      
      const res = await api.post(
        `/posts/${postId}/unlike`,
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

// Post Slice
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

      // fetchFeed
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

      //  createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload;
      })

      // getUserPosts
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

      // likePost
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
      // unlikePost
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