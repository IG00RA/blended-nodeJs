const { HttpError } = require("../helpers/HttpError");
const jwt = require("jsonwebtoken");
const { User } = require("./../models/User");
const { assignTokens } = require("../helpers/assignTokens");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return next(new HttpError(401, "Unauthorized"));
  }

  const decoded = jwt.decode(token);
  let user;
  try {
    user = await User.findById(decoded.id);
    if (!user || !user.refresh_token) {
      return next(new HttpError(401, "Unauthorized"));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (error) {
    if (error.name !== "TokenExpiredError") {
      return next(new HttpError(401, "Unauthorized"));
    }

    try {
      jwt.verify(user.refresh_token, REFRESH_TOKEN_SECRET);
      const { accessToken, refreshToken } = assignTokens(user);

      await User.findByIdAndUpdate(user._id, { refresh_token: refreshToken });

      res.status(200).json({ token: accessToken });
    } catch (error) {
      next(new HttpError(401, "Refresh token expired"));
    }
  }
};

module.exports = {
  auth,
};
