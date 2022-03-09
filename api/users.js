const jwt = require("jsonwebtoken");

const { Router } = require("express");
const {
  getUserByUsername,
  createUser,
  getUser,
  getPublicRoutinesByUser,
  getAllRoutinesByUser,
} = require("../db/");

const userRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "some default secret";

//REGISTER USER
userRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username) {
      throw new Error("Invalid username");
      // res.status(400);
    }

    if (!password || password.length < 8) {
      throw new Error("Invalid password, must be at least 8 characters long");
    }
    const retrivedUser = await getUserByUsername(username);
    if (retrivedUser) {
      // throw new Error("Username already exists");
      res.status(400).send({ error: "User already exists" });
      return next();
    }

    const createdUser = await createUser({ username, password });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    return next(error);
  }
});

//LOGIN USER
userRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return next(new Error("No username credential"));
  }
  if (!password) {
    return next(new Error("No password credential"));
  }

  try {
    const user = await getUser({ username, password });
    if (user) {
      const token = jwt.sign(
        { username: user.username, id: user.id },
        JWT_SECRET
      );
      res.status(200).send({ token, username: user.username, userId: user.id });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    return next(error);
  }
});

userRouter.get("/me", async (req, res, next) => {
  if (!req.user) {
    return next(new Error("Unauthorized operation, you can't see a profile"));
  }
  res.send(req.user);
});

//ROUTINES BY USERNAME
// GET /users/:username/routines
userRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsername(username);
    let routines;
    if (req.user && req.user.id === user.id) {
      console.log("routines by username is working");
      routines = await getAllRoutinesByUser({ username });
    } else {
      routines = await getPublicRoutinesByUser({ username });
    }
    res.status(200).send(routines);
  } catch (error) {
    return next(error);
  }
});

module.exports = userRouter;
