const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//dot env
dotenv.config();
//middlewares
//mongodb connection
connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//USER Routes
app.use("/api/v1/user", userRoutes);
//BLOG Routes
app.use("/api/v1/blog", blogRoutes);
// PORT
const PORT = process.env.PORT || 8000;
//listen
app.listen(PORT, () => {
  console.log(
    `server is running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan
      .white
  );
});
