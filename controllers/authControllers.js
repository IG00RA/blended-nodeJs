const { controllerWrapper } = require("../helpers/controllerWraper");
const {
  signupService,
  loginService,
  logoutService,
} = require("./../services/authServices");

const signup = controllerWrapper(async (req, res) => {
  const user = await signupService(req.body);
  res.status(201).json(user);
});

const login = controllerWrapper(async (req, res) => {
  const token = await loginService(req.body);
  res.status(200).json({ token });
});

const logout = controllerWrapper(async (req, res) => {
  await logoutService(req.user._id);

  res.status(200).json({ message: "Successful logout" });
});

module.exports = {
  signup,
  login,
  logout,
};
