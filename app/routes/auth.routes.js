const controller = require("../controllers/auth.controller");
const passport = require("passport");
const {
  registerValidation,
  validate,
} = require("../middlewares/validation.middleware");
const { checkRole } = require("../middlewares/rbac.middleware");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers");
    next();
  });
  app.post("/api/auth/signup", registerValidation, validate, controller.signup);
  app.post(
    "/api/auth/signin",
    passport.authenticate("local", { session: false }),
    checkRole(["admin", "supervisor", "salesperson"]),
    controller.signin
  );
};
