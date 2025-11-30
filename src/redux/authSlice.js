// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

// 🔹 Load from localStorage (if exists)
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

// 🔹 Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, username, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
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

// 🔹 Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// 🔹 Update Profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await axios.put(`${API_URL}/update-profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data; // updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

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
      })
      .addCase(registerUser.fulfilled, (state, action) => {
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
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register failed";
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
});
      ;
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;