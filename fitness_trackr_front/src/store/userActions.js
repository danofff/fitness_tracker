import { userActions } from "./userSlice";
import { loginUser, registerUser } from "../utils/apiCalls";
// import { fetchPosts } from "./postsActions";
import { uiActions } from "./uiSlice";

export const loginUserAct = (username, password) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      console.log("user actions working");
      const user = await loginUser({ username, password });
      dispatch(userActions.loginUser(user));
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
      return false;
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const registerUserAct = (username, password) => {
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      await registerUser({ username, password });
      return true;
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
      return false;
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const fetchUserAct = () => {
  return (dispatch) => {
    const userFromStorage = localStorage.getItem("user");
    const user = JSON.parse(userFromStorage);
    if (user) {
      dispatch(userActions.fetchUserFromLocal(user));
    }
  };
};
