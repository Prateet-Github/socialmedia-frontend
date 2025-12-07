import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/api/notifications`;

export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load");
    }
  }
);

export const markAllRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { getState }) => {
    const token = getState().auth.token;
    await axios.put(`${API}/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    items: [],
    unreadCount: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        // count unread
        state.unreadCount = action.payload.filter(n => !n.read).length;
      })

      // mark read
      .addCase(markAllRead.fulfilled, (state) => {
        state.items = state.items.map(n => ({ ...n, read: true }));
        state.unreadCount = 0;
      })
  },
});

export const selectUnreadCount = (state) =>
  state.notifications.items.filter(n => !n.read).length;

export default notificationSlice.reducer;