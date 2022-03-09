const { client } = require("./client");
const { getUserByUsername } = require("./users");
const { getRoutineActivitiesByRoutine } = require("./routine_activities");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT *
            FROM routines
            WHERE id = $1;
        `,
      [id]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const result = await client.query(`
        SELECT routines.id as id, "creatorId", "isPublic", name, goal, username as "creatorName"
        FROM routines
        JOIN users ON users.id = routines."creatorId";
       `);
    return result.rows;
  } catch (error) {
    throw error;
  }
}
//helper function
async function getRoutinesWithActivities(routines) {
  try {
    const routinesWithActProms = routines.map(async (routine) => {
      const routineActivities = await getRoutineActivitiesByRoutine({
        id: routine.id,
      });
      return {
        ...routine,
        activities: routineActivities,
      };
    });

    const routinsWithActivities = await Promise.all(routinesWithActProms);

    return routinsWithActivities;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const routines = await getRoutinesWithoutActivities();

    const routinesWithAct = await getRoutinesWithActivities(routines);

    return routinesWithAct;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const routinesAll = await getAllRoutines();
    const routinesPublic = routinesAll.filter((routine) => routine.isPublic);
    return routinesPublic;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const user = await getUserByUsername(username);

    const { rows: routines } = await client.query(
      `
        SELECT routines.id as id, "creatorId", username as "creatorName", "isPublic", name, goal
        FROM routines
        JOIN users ON users.id = routines."creatorId"
        WHERE "creatorId" = $1;
       `,
      [user.id]
    );

    const routineWithAct = await getRoutinesWithActivities(routines);

    return routineWithAct;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const routines = await getAllRoutinesByUser({ username });

    return routines.filter((routine) => routine.isPublic);
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(
      `
       SELECT routines.id as id, "creatorId", "isPublic", name, goal, duration, count, username as "creatorName"
       FROM routines
       JOIN routine_activities ON routines.id = routine_activities."routineId"
       JOIN users ON users.id = routines."creatorId"
       WHERE routine_activities."activityId" = $1 AND routines."isPublic" = TRUE
       `,
      [id]
    );

    const routinesWithAct = await getRoutinesWithActivities(routines);
    return routinesWithAct;
    return routines;
  } catch (error) {
    throw error;
  }
}

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines ("creatorId", "isPublic", name, goal)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function updateRoutine(updateData) {
  try {
    let updateStr = Object.keys(updateData)
      .filter((key) => key !== "id")
      .map((key, index) => `"${key}"=$${index + 2}`)
      .join(", ");

    const {
      rows: [routine],
    } = await client.query(
      `
        UPDATE routines
        SET ${updateStr}
        WHERE id = $1
        RETURNING *;
       `,
      Object.values(updateData)
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutine(id) {
  try {
    await client.query(
      `
        DELETE FROM routine_activities
        WHERE "routineId" = $1;
       `,
      [id]
    );

    const {
      rows: [routine],
    } = await client.query(
      `
        DELETE FROM routines
        WHERE id = $1
        RETURNING *;
       `,
      [id]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
