const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  removeTaskService,
} = require("../services/tasksServices");

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const getOneTask = async (req, res, next) => {
  try {
    const oneTask = await getOneTaskService(req.params.id);
    res.status(200).json(oneTask);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await updateTaskService(id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await removeTaskService(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  updateTask,
  removeTask,
};
