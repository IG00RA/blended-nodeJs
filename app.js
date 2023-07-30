const express = require("express");
const { authRouter } = require("./routes/auth");
const { tasksRouter } = require("./routes/tasks");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");

const app = express();

app.use(express.json());
app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;
