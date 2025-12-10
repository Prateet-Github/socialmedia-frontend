import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api.js";

// Get comments for a post
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const res = await api.get(`/comments/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return { postId, comments: res.data };
    } catch (err) {
      return rejectWithValue({
        postId,
        message: err.response?.data?.message || "Failed to load comments",
      });
    }
  }
);

// Add a new comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, content }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const res = await api.post(
        "/comments",
        { postId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Comment response from server:", res.data);

      return { postId, comment: res.data };
    } catch (err) {
      console.error("Comment request failed:", err.response?.data || err.message);
      console.error("Full error:", err);
      return rejectWithValue({
        postId,
        message: err.response?.data?.message || err.message || "Failed to add comment",
      });
    }
  }
);

const initialState = {
  byPostId: {},         // postId -> [comments]
  loadingByPostId: {},  // postId -> boolean
  errorByPostId: {},    // postId -> message
};

// Comment Slice
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentsError(state, action) {
      const postId = action.payload;
      if (postId) state.errorByPostId[postId] = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH COMMENTS
      .addCase(fetchComments.pending, (state, action) => {
        const postId = action.meta.arg;
        state.loadingByPostId[postId] = true;
        state.errorByPostId[postId] = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.loadingByPostId[postId] = false;
        state.byPostId[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const { postId, message } = action.payload || {};
        if (!postId) return;
        state.loadingByPostId[postId] = false;
        state.errorByPostId[postId] = message || "Failed to load comments";
      })

      // ADD COMMENT
      .addCase(addComment.pending, (state, action) => {
        const { postId } = action.meta.arg;
        state.errorByPostId[postId] = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        if (!state.byPostId[postId]) {
          state.byPostId[postId] = [comment];
        } else {
          // NEWEST FIRST
          state.byPostId[postId].unshift(comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        const { postId, message } = action.payload || {};
        if (!postId) return;
        state.errorByPostId[postId] = message || "Failed to add comment";
      });
  },
});

export const { clearCommentsError } = commentSlice.actions;
export default commentSlice.reducer;