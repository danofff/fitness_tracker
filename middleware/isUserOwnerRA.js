const { getRoutineActivityById, getRoutineById } = require("../db/");

const isUserOwnerRA = async (req, res, next) => {
  const { routineActivityId } = req.params;
  console.log("is user own routine", routineActivityId);
  try {
    const routineActivity = await getRoutineActivityById(routineActivityId);
    const routine = await getRoutineById(routineActivity.routineId);
    if (routine.creatorId === req.user.id) {
      req.routineActivityId = routineActivityId;
      return next();
    } else {
      throw new Error("Routine_activity doesn't belong to user");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = isUserOwnerRA;
