const Joi = require("joi");

const createTaskValidationSchema = Joi.object({
  title: Joi.string().min(5).max(30).required(),
  completed: Joi.boolean().optional(),
});

const updateTaskValidationSchema = Joi.object()
  .keys({
    title: createTaskValidationSchema.extract("title").optional(),
    completed: createTaskValidationSchema.extract("completed").optional(),
  })
  .or("title", "completed");

// .min(1)

module.exports = {
  createTaskValidationSchema,
  updateTaskValidationSchema,
};
