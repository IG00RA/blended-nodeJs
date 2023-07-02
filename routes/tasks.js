const express = require("express");
const { getAllTasks, getOneTask } = require("../controllers/tasksControllers");

const router = express.Router();

router.get("/", getAllTasks);

router.get("/:id", getOneTask);

module.exports = {
  tasksRouter: router,
};
