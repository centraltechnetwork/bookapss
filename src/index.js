import express from "express";
import httpstatus from "http-status";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./dbconnect/connect.js";
import colors from "colors";
import usersRoute from "./routes/usersRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import bodyParser from "body-parser";

// create an instance of express server
const app = express();
dotenv.config();

const { PORT } = process.env;
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/users", usersRoute);
app.use("/api/admin", adminRoute);


app.get("/", (req, res) => {
  res.status(httpstatus.OK).json({
    status: "success",
    message: "Welcome to my e-library web application server!",
  });
});

app.get("/about-us", (req, res) => {
  res.status(httpstatus.OK).json({
    status: "success",
    message: "About us page content",
  });
});

dbConnection().then(() => {
  console.log("database connection successful".bgGreen);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgBlue); // log the server's listening port
  });
});
