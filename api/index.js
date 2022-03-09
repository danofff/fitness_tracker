// create an api router
const { Router } = require("express");
const router = Router();

//middleware
const retriveUserFromHeaders = require("../middleware/retriveUserFromHeaders");
router.use(retriveUserFromHeaders);

//importing routes
const usersRouter = require("./users");
const activitiesRouter = require("./activities");
const routinesRouter = require("./routines");
const routineActivitiesRouter = require("./routine_activities");

router.get("/health", (req, res, next) => {
  res.send({ message: "some string" });
});

//users routes
router.use("/users", usersRouter);

//activities routes
router.use("/activities", activitiesRouter);

//routines routes
router.use("/routines", routinesRouter);

//routine_activities
router.use("/routine_activities", routineActivitiesRouter);

router.use((error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

module.exports = router;
