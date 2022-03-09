const { Router } = require("express");
const { updateRoutineActivity, destroyRoutineActivity } = require("../db");
const checkUser = require("../middleware/checkUser");
const isUserOwnerRA = require("../middleware/isUserOwnerRA");

const routineActivitiesRouter = Router();

routineActivitiesRouter.patch(
  "/:routineActivityId",
  checkUser,
  isUserOwnerRA,
  async (req, res, next) => {
    const { routineActivityId } = req.params;
    const { count, duration } = req.body;

    try {
      const editedRA = await updateRoutineActivity({
        id: routineActivityId,
        count,
        duration,
      });
      res.status(201).send(editedRA);
    } catch (error) {
      return next(error);
    }
  }
);

routineActivitiesRouter.delete(
  "/:routineActivityId",
  checkUser,
  isUserOwnerRA,
  async (req, res, next) => {
    const { routineActivityId } = req.params;

    try {
      const deletedRA = await destroyRoutineActivity(routineActivityId);
      res.status(201).send(deletedRA);
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = routineActivitiesRouter;
