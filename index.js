require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./db/connectDB");

const { DB_URI, PORT = 3000 } = process.env;

(async () => {
  await connectDB(DB_URI);
  console.log("Database connection was established");
  app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
})();
