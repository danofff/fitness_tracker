const { getRoutineById } = require("../db");

const isUserOwnerRoutines = async (req, res, next) => {
  const { routineId } = req.params;
  try {
    const routine = await getRoutineById(routineId);
    if (routine.creatorId === req.user.id) {
      req.routineId = routineId;
      return next();
    } else {
      throw new Error("Routine doesn't belong to user");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = isUserOwnerRoutines;
