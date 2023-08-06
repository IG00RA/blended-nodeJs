const bcrypt = require("bcrypt");
const { HttpError } = require("../helpers/HttpError");
const { User } = require("./../models/User");
const { assignTokens } = require("./../helpers/assignTokens");

const signupService = async (body) => {
  const user = await User.findOne({ email: body.email });

  if (user) {
    throw new HttpError(409, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = await User.create({ ...body, password: hashedPassword });

  newUser.password = undefined;

  return newUser;
};

const loginService = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new HttpError(401, "Email or password incorrect");
  }

  const isPasswordCorrect = await bcrypt.compare(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(401, "Email or password incorrect");
  }

  const { accessToken, refreshToken } = assignTokens(user);
  await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });

  return accessToken;
};

const logoutService = async (id) => {
  await User.findByIdAndUpdate(id, { refresh_token: null });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
};
