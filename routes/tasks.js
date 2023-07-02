const express = require("express");
const {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  removeTask,
} = require("../controllers/tasksControllers");

const router = express.Router();
router.route("/").get(getAllTasks).post(createTask);

router.route("/:id").get(getOneTask).patch(updateTask).delete(removeTask);

// router.get("/", getAllTasks);

// router.get("/:id", getOneTask);

// router.post("/", createTask);

// router.patch("/:id", updateTask);

// router.delete("/:id", removeTask);

module.exports = {
  tasksRouter: router,
};
