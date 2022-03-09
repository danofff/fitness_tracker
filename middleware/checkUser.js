const checkUser = (req, res, next) => {
  if (req.user) {
    console.log("user is set");
    return next();
  } else {
    const error = new Error("Unauthorized operation");
    return next(error);
  }
};

module.exports = checkUser;
