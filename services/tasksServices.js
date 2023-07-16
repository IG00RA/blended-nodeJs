const { HttpError } = require("../helpers/HttpError");
const { Task } = require("../models/Task");

const getAllTasksService = async () => {
  return await Task.find();
};

// .findOne({_id: id})

const getOneTaskService = async (id) => {
  const oneTask = await Task.findById(id);
  if (!oneTask) {
    throw new HttpError(404, "Task not found");
  }
  return oneTask;
};

const createTaskService = async (body) => {
  return await Task.create(body);
};

const updateTaskService = async (id, body) => {
  const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });
  if (!updatedTask) {
    throw new HttpError(404, "Task not found");
  }
  return updatedTask;
};

const removeTaskService = async (id) => {
  const deletedTask = await Task.findByIdAndRemove(id);
  if (!deletedTask) {
    throw new HttpError(404, "Task not found");
  }
  return deletedTask;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  removeTaskService,
};
