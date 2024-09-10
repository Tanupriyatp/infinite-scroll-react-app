import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../../services/postfeed';


export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (page) => {
    const response = await fetchPosts(page, 10);
    return response;
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    articles: [],
    currentPage: 1,
    isLoading: false,
    canLoadMore: true,
  },
  reducers: {
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.canLoadMore = false; // No more articles to load
        } else {
          state.articles = [...state.articles, ...action.payload];
        }
        state.isLoading = false;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoading = false;
        state.canLoadMore = false;
      });
  },
});

export const { incrementPage } = postSlice.actions;
export default postSlice.reducer;
