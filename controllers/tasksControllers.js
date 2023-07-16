const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  removeTaskService,
} = require("../services/tasksServices");

const { controllerWrapper } = require("../helpers/controllerWraper");

const getAllTasks = controllerWrapper(async (req, res, next) => {
  const tasks = await getAllTasksService();
  res.status(200).json(tasks);
});

const getOneTask = controllerWrapper(async (req, res, next) => {
  const oneTask = await getOneTaskService(req.params.id);
  res.status(200).json(oneTask);
});

const createTask = controllerWrapper(async (req, res, next) => {
  const newTask = await createTaskService(req.body);
  res.status(201).json(newTask);
});

const updateTask = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedTask = await updateTaskService(id, req.body);
  res.status(200).json(updatedTask);
});

const removeTask = controllerWrapper(async (req, res, next) => {
  const { id } = req.params;
  const deletedTask = await removeTaskService(id);
  res.status(200).json(deletedTask);
});

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  removeTask,
};
