const mongoose = require("mongoose");

const defaultOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Object.assign(defaultOptions, options);

const connectDB = (URI, options = defaultOptions) => {
  return mongoose.connect(URI, options);
};

module.exports = { connectDB };
