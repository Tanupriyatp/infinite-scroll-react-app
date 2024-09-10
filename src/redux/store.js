import { configureStore } from "@reduxjs/toolkit";
import  postReducer  from "./reducer/post.slice.js";

const store = configureStore({
  reducer: {
    posts: postReducer, // Add the post reducer to the store
  },
});

export default store;
