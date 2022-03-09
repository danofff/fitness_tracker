import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import dataSlice from "./dataSlice";
import uiSlice from "./uiSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    data: dataSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export default store;
