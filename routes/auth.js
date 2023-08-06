const express = require("express");

const router = express.Router();

const { signup, login, logout } = require("./../controllers/authControllers");
const { auth } = require("./../middlewares/auth");
const { validateBody } = require("../helpers/validateBody");

const {
  signUpValidationSchema,
  loginValidationSchema,
} = require("../helpers/validation/authValidationSchemas");

router.post("/signup", validateBody(signUpValidationSchema), signup);

router.post("/login", validateBody(loginValidationSchema), login);

router.post("/logout", auth, logout);

module.exports = {
  authRouter: router,
};
