const { Router } = require("express");
const {
  getAllActivities,
  createActivity,
  updateActivity,
  getPublicRoutinesByActivity,
} = require("../db");
const checkUser = require("../middleware/checkUser");

const activitiesRouter = Router();

//GET ALL ACTIVITIES
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.status(200).send(activities);
  } catch (error) {
    return next(error);
  }
});

//CREATE ACTIVITY
//POST /activities (*)
activitiesRouter.post("/", checkUser, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      throw new Error("Activity must not to be empty");
    }
    if (!description) {
      throw new Error("Description must not to be empty");
    }
    const activity = await createActivity({ name, description });
    res.status(201).send(activity);
  } catch (error) {
    return next(error);
  }
});

//UPDATE ACTIVITY
//PATCH /activities/:activityId (*)
activitiesRouter.patch("/:activityId", checkUser, async (req, res, next) => {
  const { name, description } = req.body;
  const { activityId } = req.params;

  try {
    const activity = await updateActivity({
      id: activityId,
      name,
      description,
    });
    res.status(201).send(activity);
  } catch (error) {
    return next(error);
  }
});

//GET PUBLIC ROUTINES BY ACTIVITY
//GET /activities/:activityId/routines
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
  const { activityId: id } = req.params;

  try {
    const routines = await getPublicRoutinesByActivity({ id });
    res.status(200).send(routines);
  } catch (error) {
    return next(error);
  }
});
module.exports = activitiesRouter;
