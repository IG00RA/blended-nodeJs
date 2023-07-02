const {
  getAllTasksService,
  getOneTaskService,
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

module.exports = {
  getAllTasks,
  getOneTask,
};
