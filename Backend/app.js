import dotenv from "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import mapRouter from "./routes/map.route.js";
import rideRouter from "./routes/ride.route.js";

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routers
app.get("/", (req, res) => {
  res.send("server is running..");
});
app.use("/user", userRoute);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride",rideRouter);

export default app;
