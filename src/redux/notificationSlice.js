import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const res = await api.get('/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to load");
    }
  }
);

// Mark all notifications as read
export const markAllRead = createAsyncThunk(
  "notifications/markAllRead",
  async (_, { getState }) => {
    const token = getState().auth.token;
    await api.put(`/notifications/read`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return true;
  }
);

// Notification Slice
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