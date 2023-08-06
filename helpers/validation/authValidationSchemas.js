const Joi = require("joi");
const { passwordPattern } = require("./index.js");

const signUpValidationSchema = Joi.object({
  username: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password should contain at least eight characters, one number and one letter",
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: signUpValidationSchema.extract("email"),
  password: signUpValidationSchema.extract("password"),
});

module.exports = { signUpValidationSchema, loginValidationSchema };
