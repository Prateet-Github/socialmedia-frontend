import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

// Search users
export const searchUsers = createAsyncThunk(
  "users/search",
  async (query, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(
        `/users/search?q=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // backend: res.json(users)
      return res.data;
    } catch (err) {
      return rejectWithValue("Search failed");
    }
  }
);

// User Search Slice
const userSearchSlice = createSlice({
  name: "userSearch",
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // searchUsers
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearchResults } = userSearchSlice.actions;
export default userSearchSlice.reducer;