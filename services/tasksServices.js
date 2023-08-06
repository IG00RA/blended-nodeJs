const { HttpError } = require("../helpers/HttpError");
const { Task } = require("../models/Task");

const getAllTasksService = async (userId) => {
  return await Task.find({
    owner: userId,
  });
};

// .findOne({_id: id})

const getOneTaskService = async (id, userId) => {
  const oneTask = await Task.findOne({ _id: id, owner: userId });
  if (!oneTask) {
    throw new HttpError(404, "Task not found");
  }
  return oneTask;
};

const createTaskService = async (body, userId) => {
  return await Task.create({ ...body, owner: userId });
};

const updateTaskService = async (id, body, userId) => {
  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, owner: userId },
    body,
    { new: true }
  );
  if (!updatedTask) {
    throw new HttpError(404, "Task not found");
  }
  return updatedTask;
};

const removeTaskService = async (id, userId) => {
  const deletedTask = await Task.findOneAndRemove({ _id: id, owner: userId });
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
