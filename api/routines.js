const { Router } = require("express");
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  addActivityToRoutine,
} = require("../db");
const isUserOwnerRoutines = require("../middleware/isUserOwner");
const checkUser = require("../middleware/checkUser");

const routinesRouter = Router();

//GET ALL PUBLIC ROUTINES
routinesRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    res.status(200).send(routines);
  } catch (error) {
    return next(error);
  }
});

//CREATE ROUTINE
routinesRouter.post("/", checkUser, async (req, res, next) => {
  const { name, goal, isPublic } = req.body;

  try {
    const createdRoutine = await createRoutine({
      creatorId: req.user.id,
      isPublic,
      name,
      goal,
    });
    res.status(201).send(createdRoutine);
  } catch (error) {
    return next(error);
  }
});

//UPDATE ROUTINE
//PATCH /routines/:routineId
routinesRouter.patch(
  "/:routineId",
  checkUser,
  isUserOwnerRoutines,
  async (req, res, next) => {
    const { name, goal, isPublic } = req.body;
    try {
      const updatedRoutine = await updateRoutine({
        id: req.routineId,
        isPublic,
        name,
        goal,
      });
      res.status(201).send(updatedRoutine);
    } catch (error) {
      return next(error);
    }
  }
);

//DESTROY ROUTINE
//DELETE /routines/:routineId
routinesRouter.delete(
  "/:routineId",
  checkUser,
  isUserOwnerRoutines,
  async (req, res, next) => {
    try {
      console.log("routine deletion is working");
      const deletedRoutine = await destroyRoutine(req.routineId);
      res.status(201).send(deletedRoutine);
    } catch (error) {
      return next(error);
    }
  }
);

//ATTACH SINGLE ACTIVITY TO ROUTINE
//POST /routines/:routineId/activities
routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId, count, duration } = req.body;
  try {
    const routine_activity = await addActivityToRoutine({
      routineId,
      activityId,
      count: parseInt(count),
      duration: parseInt(duration),
    });
    res.status(201).send(routine_activity);
  } catch (error) {
    console.log("adding function isn't working");
    return next(error);
  }
});

module.exports = routinesRouter;
