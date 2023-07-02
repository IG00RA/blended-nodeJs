const fs = require("fs/promises");
const path = require("path");
const { HttpError } = require("../helpers/HttpError");
const crypto = require("crypto");

const tasksPath = path.join(__dirname, "..", "db", "tasks.json");

const getAllTasksService = async () => {
  const data = await fs.readFile(tasksPath);
  return JSON.parse(data);
};

const getOneTaskService = async (id) => {
  const tasks = await getAllTasksService();
  const oneTask = tasks.find((task) => task.id === id);
  if (!oneTask) {
    throw new HttpError(404, "Task not found");
  }
  return oneTask;
};

const createTaskService = async (body) => {
  const tasks = await getAllTasksService();
  const newTask = {
    id: crypto.randomUUID(),
    ...body,
  };
  tasks.push(newTask);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
  return newTask;
};

const updateTaskService = async (id, body) => {
  const tasks = await getAllTasksService();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new HttpError(404, "Task not found");
  }
  tasks[index] = { ...tasks[index], ...body };
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
  return tasks[index];
};

const removeTaskService = async (id) => {
  const tasks = await getAllTasksService();
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    throw new HttpError(404, "Task not found");
  }
  const [deletedTask] = tasks.splice(index, 1);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 4));
  return deletedTask;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  updateTaskService,
  removeTaskService,
};
