const notFoundHandler = (req, res, next) => {
  return res.status(404).json({
    message: "This route does not exist, please check the documentation",
  });
};

module.exports = notFoundHandler;
