import makeHeaders from "./makeHeaders";

//emily
// const apiBase = "https://serene-springs-07906.herokuapp.com/"

//danylo
const apiBase = "https://glacial-hamlet-08464.herokuapp.com/api";

// const apiBase = "http://localhost:8000/api";

//register user api call
export const registerUser = async (userData) => {
  const response = await fetch(`${apiBase}/users/register`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const result = await response.json();
    //set user right here or return value
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//login user api call
export const loginUser = async (userData) => {
  const response = await fetch(`${apiBase}/users/login`, {
    method: "POST",
    headers: makeHeaders(),
    body: JSON.stringify(userData),
  });
  if (response.ok) {
    const result = await response.json();

    //return user value;
    return result;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetching all public routines api call
export const fetchPublicRoutines = async () => {
  const response = await fetch(`${apiBase}/routines`, {
    headers: makeHeaders(),
  });
  if (response.ok) {
    const routines = await response.json();
    return routines;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetch all activities api call
export const fetchActivities = async () => {
  const response = await fetch(`${apiBase}/activities`, {
    headers: makeHeaders(),
  });
  if (response.ok) {
    const activities = await response.json();
    return activities;
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetch myroutines api call
export const fetchMyRoutines = async (token) => {
  const responseMe = await fetch(`${apiBase}/users/me`, {
    headers: makeHeaders(token),
  });
  if (responseMe.ok) {
    const data = await responseMe.json();
    const userName = data.username;
    const response = await fetch(`${apiBase}/users/${userName}/routines`, {
      headers: makeHeaders(token),
    });
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  } else {
    const error = await responseMe.json();
    throw new Error(error.error);
  }
};

//fetch routines by username
export const fetchRoutinesByUsername = async (username) => {
  const response = await fetch(`${apiBase}/users/${username}/routines`);
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//fetch routines by activity
export const fetchRoutinesByActivity = async (activityId) => {
  const response = await fetch(`${apiBase}/activities/${activityId}/routines`);
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//create new routine
export const createRoutine = async (token, isPublic, name, goal) => {
  const response = await fetch(`${apiBase}/routines`, {
    method: "POST",
    headers: makeHeaders(token),
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//edit routine
export const editRoutine = async (token, routineId, name, goal, isPublic) => {
  const response = await fetch(`${apiBase}/routines/${routineId}`, {
    method: "PATCH",
    headers: makeHeaders(token),
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//delete routine
export const deleteRoutine = async (token, routineId) => {
  await fetch(`${apiBase}/routines/${routineId}`, {
    method: "DELETE",
    headers: makeHeaders(token),
  });
};

//create new activity
export const createActivity = async (token, name, description) => {
  const response = await fetch(`${apiBase}/activities`, {
    method: "POST",
    headers: makeHeaders(token),
    body: JSON.stringify({
      name,
      description,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//edit activity
export const editActivity = async (token, id, name, description) => {
  const response = await fetch(`${apiBase}/activities/${id}`, {
    method: "PATCH",
    headers: makeHeaders(token),
    body: JSON.stringify({
      name,
      description,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//create routine_activity
export const createRoutineActivity = async (
  token,
  routineId,
  activityId,
  count,
  duration
) => {
  const response = await fetch(`${apiBase}/routines/${routineId}/activities`, {
    method: "POST",
    headers: makeHeaders(token),
    body: JSON.stringify({
      count,
      duration,
      activityId,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//edit routine activity
export const editRoutineActivity = async (token, id, count, duration) => {
  const response = await fetch(`${apiBase}/routine_activities/${id}`, {
    method: "PATCH",
    headers: makeHeaders(token),
    body: JSON.stringify({
      count,
      duration,
    }),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};

//delete routine_activity
export const deleteRoutineActivity = async (token, id) => {
  const response = await fetch(`${apiBase}/routine_activities/${id}`, {
    method: "DELETE",
    headers: makeHeaders(token),
  });
  if (response.ok) {
    return await response.json();
  } else {
    const error = await response.json();
    throw new Error(error.error);
  }
};
