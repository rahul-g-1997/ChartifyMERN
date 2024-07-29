// loaderSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  isLoading: true,
};

// Create loader slice
const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

// Export actions
export const { startLoading, stopLoading } = loaderSlice.actions;

// Export reducer
export default loaderSlice.reducer;
