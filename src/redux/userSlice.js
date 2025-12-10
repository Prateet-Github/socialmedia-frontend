import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";;

// Fetch public profile by username
export const fetchPublicProfile = createAsyncThunk(
  "user/fetchPublicProfile",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/public/${username}`);
      return res.data; // { user, posts }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load profile"
      );
    }
  }
);

// Follow user action
export const followUserProfile = createAsyncThunk(
  "user/followUserProfile",
  async ({ username, token }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/users/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // { message, user }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to follow user"
      );
    }
  }
);

// Unfollow user action
export const unfollowUserProfile = createAsyncThunk(
  "user/unfollowUserProfile",
  async ({ username, token }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/users/${username}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data; // { message, user }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to unfollow user"
      );
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "publicUser",
  initialState: {
    profile: null,
    posts: [],
    loading: false,
    error: null,
    followLoading: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.posts = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch Public Profile
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
      })

      // Follow User
      .addCase(followUserProfile.pending, (state) => {
        state.followLoading = true;
        state.error = null;
      })
      .addCase(followUserProfile.fulfilled, (state, action) => {
        state.followLoading = false;
        if (action.payload.user) {
          state.profile = {
            ...state.profile,
            ...action.payload.user
          };
        }
      })
      .addCase(followUserProfile.rejected, (state, action) => {
        state.followLoading = false;
        state.error = action.payload;
      })

      // Unfollow User
      .addCase(unfollowUserProfile.pending, (state) => {
        state.followLoading = true;
        state.error = null;
      })
      .addCase(unfollowUserProfile.fulfilled, (state, action) => {
        state.followLoading = false;
        if (action.payload.user) {
          state.profile = {
            ...state.profile,
            ...action.payload.user
          };
        }
      })
      .addCase(unfollowUserProfile.rejected, (state, action) => {
        state.followLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearProfile } = userSlice.actions;
export default userSlice.reducer;