const express = require("express");

const router = express.Router();

const { signup, login, logout } = require("./../controllers/authControllers");
const { auth } = require("./../middlewares/auth");

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", auth, logout);

module.exports = {
  authRouter: router,
};
