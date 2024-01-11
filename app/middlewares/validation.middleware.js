const { body, validationResult } = require("express-validator");

const registerValidation = [
  body("username").notEmpty().withMessage("Username Cannot be empty"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("region")
    .isIn(["HQ", "Nairobi", "Coast", "Rift", "Central", "Lake", "Eastern"])
    .withMessage("Invalid Region"),
  body("role")
    .isIn(["admin", "supervisor", "salesperson"])
    .withMessage("Invalid Role"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidation,
  validate,
};
