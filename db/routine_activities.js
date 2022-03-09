const { client } = require("./client");

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      SELECT *
      FROM routine_activities
      WHERE id = $1;
      `,
      [id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
       INSERT INTO routine_activities ("routineId", "activityId", count, duration)
       VALUES ($1, $2, $3, $4)
       RETURNING *;
       `,
      [routineId, activityId, count, duration]
    );

    return routine_activity;
  } catch (error) {
    console.log("db is not working", error.message);
    throw error;
  }
}

async function updateRoutineActivity({ id, count, duration }) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
       UPDATE routine_activities
       SET count = $1, duration = $2
       WHERE id = $3
       RETURNING *;
       `,
      [count, duration, id]
    );

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
            DELETE FROM routine_activities
            WHERE id = $1
            RETURNING *;
        `,
      [id]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: routine_activities } = await client.query(
      `
       SELECT routine_activities.id as id, "routineId", "activityId", duration, count, name, description
       FROM routine_activities
       JOIN activities ON activities.id = routine_activities."activityId"
       WHERE "routineId" = $1;
       `,
      [id]
    );
    return routine_activities;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
