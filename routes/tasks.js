const express = require("express");
const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  removeTask,
} = require("../controllers/tasksControllers");
const { validateBody } = require("../helpers/validateBody");
const {
  createTaskValidationSchema,
  updateTaskValidationSchema,
} = require("../helpers/validation/tasksValidationSchemas");

const { auth } = require("../middlewares/auth");

const router = express.Router();

router.use(auth);
router
  .route("/")
  .get(getAllTasks)
  .post(validateBody(createTaskValidationSchema), createTask);

router
  .route("/:id")
  .get(getOneTask)
  .patch(validateBody(updateTaskValidationSchema), updateTask)
  .delete(removeTask);

// router.get("/", getAllTasks);

// router.get("/:id", getOneTask);

// router.post("/", createTask);

// router.patch("/:id", updateTask);

// router.delete("/:id", removeTask);

module.exports = {
  tasksRouter: router,
};
