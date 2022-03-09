import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    snackbar: {
      isSnackbarOpen: false,
      type: "success",
      text: "some default text",
    },
    loader: false,
  },
  reducers: {
    setSnackbar(state, action) {
      console.log("set snackbar is working");
      state.snackbar = action.payload;
    },
    setLoader(state, action) {
      console.log("set loader is working");
      state.loader = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
