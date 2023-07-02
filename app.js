const express = require("express");
const { tasksRouter } = require("./routes/tasks");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

app.use("/tasks", tasksRouter);
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
