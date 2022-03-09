import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    fetchUserFromLocal(state, action) {
      console.log("user dispatching is working");
      const userFromStorage = localStorage.getItem("user");
      const user = JSON.parse(userFromStorage);
      if (user) {
        state.user = user;
      }
    },
    loginUser(state, action) {
      //authenticate user logic
      console.log("authenticate user");
      state.user = action.payload;
      //store user in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutUser(state) {
      //logout user logic
      console.log("logout user is working");
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
