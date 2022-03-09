import { createSlice, current } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    routines: [],
    myRoutines: [],
    userRoutines: [],
    activityRoutines: [],
    activities: [],
  },
  reducers: {
    //ROUTINES MANIPULATIONS
    getRoutines(state, action) {
      console.log("get routines is working");
      state.routines = action.payload;
    },
    getMyRoutines(state, action) {
      console.log("get my routines is working");
      state.myRoutines = action.payload;
    },
    getUserRoutines(state, action) {
      console.log("get user routines is working");
      state.userRoutines = action.payload;
    },
    getActivityRoutines(state, action) {
      console.log("get routines by activity is working");
      state.activityRoutines = action.payload;
    },
    addRoutine(state, action) {
      console.log("add routine is working");
      state.myRoutines = [...state.myRoutines, action.payload];
    },
    editRoutine(state, action) {
      console.log("edit routine is working");
      const currentState = current(state);

      const allRoutines = [...currentState.myRoutines];
      const editedRoutine = action.payload;

      const routineIdx = allRoutines.findIndex(
        (routine) => routine.id === action.payload.id
      );

      const routine = allRoutines[routineIdx];

      allRoutines.splice(routineIdx, 1, { ...routine, ...editedRoutine });

      state.myRoutines = allRoutines;
    },
    deleteRoutine(state, action) {
      console.log("delete routine is working");
      state.myRoutines = state.myRoutines.filter(
        (routine) => routine.id !== action.payload
      );
    },

    //ACTIVITIES MANIPULATIONS
    getActivities(state, action) {
      console.log("get activities is working");
      state.activities = action.payload;
    },
    addActivity(state, action) {
      console.log("add activity is working");
      state.activities = [...state.activities, action.payload];
    },
    editActivity(state, action) {
      console.log("edit activity is working");
      const editedActivity = action.payload;
      const currentState = current(state);
      const allActivities = [...currentState.activities];
      const activityIdx = allActivities.findIndex(
        (activity) => activity.id === editedActivity.id
      );

      allActivities.splice(activityIdx, 1, editedActivity);
      state.activities = allActivities;
    },

    //ROUTINES ACTIVITIES
    addRoutineActivity(state, action) {
      console.log("add routine activity");
      const currentState = current(state);
      const addedRoutineActivity = action.payload.routineActivity;

      const allRoutines = [...currentState.myRoutines];

      const routineIdx = allRoutines.findIndex(
        (routine) => routine.id === addedRoutineActivity.routineId
      );

      const routine = allRoutines[routineIdx];

      const newActivities = [...routine.activities];
      const activity = currentState.activities.find(
        (activity) => activity.id === addedRoutineActivity.activityId
      );

      newActivities.push({
        ...addedRoutineActivity,
        name: activity.name,
        description: activity.description,
      });

      const newRoutine = { ...routine, activities: newActivities };
      allRoutines.splice(routineIdx, 1, newRoutine);

      state.myRoutines = allRoutines;
    },
    editRoutineActivity(state, action) {
      console.log("edit routine activity");
      const currentState = current(state);
      const editedRoutineActivity = action.payload;

      const allRoutines = [...currentState.myRoutines];

      const routineIdx = allRoutines.findIndex(
        (routine) => routine.id === editedRoutineActivity.routineId
      );

      const routine = allRoutines[routineIdx];

      const newActivities = [...routine.activities];

      const activityIdx = newActivities.findIndex(
        (activity) => activity.id === editedRoutineActivity.id
      );

      const activity = newActivities[activityIdx];

      newActivities.splice(activityIdx, 1, {
        ...activity,
        ...editedRoutineActivity,
      });

      const newRoutine = { ...routine, activities: newActivities };
      allRoutines.splice(routineIdx, 1, newRoutine);

      state.myRoutines = allRoutines;
    },
    deleteRoutineActivity(state, action) {
      console.log("routine activity delete");
      const currentState = current(state);

      const allRoutines = [...currentState.myRoutines];
      const routineIdx = currentState.myRoutines.findIndex(
        (routine) => routine.id === action.payload.routineId
      );

      const routine = allRoutines[routineIdx];

      const newRoutinesActivities = routine.activities.filter(
        (activity) => activity.id !== action.payload.id
      );

      const newRoutine = { ...routine, activities: newRoutinesActivities };

      allRoutines.splice(routineIdx, 1, newRoutine);

      state.myRoutines = allRoutines;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
