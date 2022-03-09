import {
  fetchPublicRoutines,
  fetchMyRoutines,
  createRoutine,
  deleteRoutine,
  fetchActivities,
  createActivity,
  createRoutineActivity,
  editActivity,
  deleteRoutineActivity,
  editRoutine,
  fetchRoutinesByUsername,
  fetchRoutinesByActivity,
  editRoutineActivity,
} from "../utils/apiCalls";
import { dataActions } from "./dataSlice";
import { uiActions } from "./uiSlice";

//ROUTINES ACTIONS
export const getPublicRoutinesAct = () => {
  console.log("get public routines action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const routines = await fetchPublicRoutines();
      dispatch(dataActions.getRoutines(routines));
    } catch (error) {
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const getMyRoutinesAct = (token) => {
  console.log("get my routines action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const routines = await fetchMyRoutines(token);
      dispatch(dataActions.getMyRoutines(routines));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const getUserRoutinesAct = (username) => {
  console.log("get user routines action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const userRoutines = await fetchRoutinesByUsername(username);
      dispatch(dataActions.getUserRoutines(userRoutines));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const getActivityRoutineAct = (activityId) => {
  console.log("get routines by activity is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const activityRoutines = await fetchRoutinesByActivity(activityId);
      dispatch(dataActions.getActivityRoutines(activityRoutines));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const createRoutineAct = (token, creatorName, isPublic, name, goal) => {
  console.log("create routine action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const createdRoutine = await createRoutine(token, isPublic, name, goal);
      createdRoutine.activities = [];
      createdRoutine.creatorName = creatorName;
      dispatch(dataActions.addRoutine(createdRoutine));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const editRoutineAct = (token, routineId, name, goal, isPublic) => {
  console.log("edit routine action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const editedRoutine = await editRoutine(
        token,
        routineId,
        name,
        goal,
        isPublic
      );
      dispatch(dataActions.editRoutine(editedRoutine));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const deleteRoutineAct = (token, id) => {
  console.log("delete routine action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      await deleteRoutine(token, id);
      dispatch(dataActions.deleteRoutine(id));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

//ACTIVITIES ACTIONS
export const getActivitiesAct = () => {
  console.log("get all activities action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const activities = await fetchActivities();
      dispatch(dataActions.getActivities(activities));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const createActivityAct = (token, name, description) => {
  console.log("crate activity action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const activity = await createActivity(token, name, description);
      dispatch(dataActions.addActivity(activity));
    } catch (error) {
      console.log(error);
      if (error.message.includes("duplicate key value violates")) {
        error.message = "Activity with that name already exists.";
      }
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const editActivityAct = (token, id, name, description) => {
  console.log("edit activity action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const editedActivity = await editActivity(token, id, name, description);
      dispatch(dataActions.editActivity(editedActivity));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

//ROUTINE ACTIVITIES ACTIONS
export const addRoutineActivityAct = (
  token,
  routineId,
  activityId,
  count,
  duration
) => {
  console.log("add routine activity action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const routineActivity = await createRoutineActivity(
        token,
        routineId,
        activityId,
        count,
        duration
      );

      dispatch(dataActions.addRoutineActivity({ routineActivity }));
    } catch (error) {
      console.log(error);
      if (error.message.includes("duplicate key value violates")) {
        error.message =
          "You cannot add duplicate activities to the same routine";
      }
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const editRoutineActivityAct = (token, id, count, duration) => {
  console.log("edit routine activity is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      const editedRoutineActivity = await editRoutineActivity(
        token,
        id,
        count,
        duration
      );
      dispatch(dataActions.editRoutineActivity(editedRoutineActivity));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};

export const deleteRoutineActivityAct = (token, id, routineId) => {
  console.log("delete activity action is working");
  return async (dispatch) => {
    try {
      dispatch(uiActions.setLoader(true));
      await deleteRoutineActivity(token, id);
      dispatch(dataActions.deleteRoutineActivity({ id, routineId }));
    } catch (error) {
      console.log(error);
      dispatch(
        uiActions.setSnackbar({
          isSnackbarOpen: true,
          text: error.message,
          type: "error",
        })
      );
    } finally {
      dispatch(uiActions.setLoader(false));
    }
  };
};
