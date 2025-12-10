import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

// Load from localStorage (if exists)
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/register", {
        name,
        username,
        email,
        password,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

// Verify Email (OTP)
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/email-verification", { email, otp });
      return res.data; // contains token + user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Verification failed");
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/login", { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.put(`/users/update-profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// Follow User
export const followUser = createAsyncThunk(
  "auth/followUser",
  async (username, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.post(
        `/users/${username}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { username, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Follow failed");
    }
  }
);

// Unfollow User
export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (username, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.post(
        `/users/${username}/unfollow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { username, data: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Unfollow failed");
    }
  }
);

// Get Followers
export const getFollowers = createAsyncThunk(
  "auth/getFollowers",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${username}/followers`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch followers");
    }
  }
);

// Get Following
export const getFollowing = createAsyncThunk(
  "auth/getFollowing",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.get(`/users/${username}/following`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch following");
    }
  }
);

// Fetch Current User Profile
export const fetchCurrentUserProfile = createAsyncThunk(
  "auth/fetchCurrentUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      
      const res = await api.get(`/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Register
      .addCase(registerUser.pending, (state) => {
      state.loading = true;
  state.error = null;
  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
  state.loading = false;
  state.error = null;

  state.user = null;
  state.token = null;
  state.isAuthenticated = false;
})
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
      })

      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
  state.loading = true;
  state.error = null;
})
      .addCase(verifyEmail.fulfilled, (state, action) => {
  state.loading = false;
  state.error = null;
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isAuthenticated = true;

  localStorage.setItem("user", JSON.stringify(action.payload.user));
  localStorage.setItem("token", action.payload.token);
})
      .addCase(verifyEmail.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Verification failed";
})

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          username: action.payload.username,
          email: action.payload.email,
          createdAt: action.payload.createdAt,
        };
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          _id: action.payload._id,
          name: action.payload.name,
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
          bio: action.payload.bio,
          location: action.payload.location,
          website: action.payload.website,
          createdAt: action.payload.createdAt,
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update failed";
      })

      // Follow User
      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Follow failed";
      })

      // Unfollow User
      .addCase(unfollowUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unfollow failed";
      })

      // Get Followers
      .addCase(getFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch followers";
      })

      // Get Following
      .addCase(getFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFollowing.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch following";
      })

      // Fetch Current User Profile
      .addCase(fetchCurrentUserProfile.pending, (state) => {
  state.loading = true;
})
      .addCase(fetchCurrentUserProfile.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  localStorage.setItem("user", JSON.stringify(action.payload));
})
      .addCase(fetchCurrentUserProfile.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;