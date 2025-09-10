import express, { Router } from "express";
import { authCaptain, authUser } from "../middlewares/auth.js";
import { confirmRide, createRide, endRide, getFareController, startRide } from "../controller/ride.controller.js";

const rideRouter=Router();

rideRouter.post("/create", authUser, createRide);
rideRouter.get("/get-fare", authUser, getFareController);
rideRouter.post("/confirm",authCaptain,confirmRide)
rideRouter.post("/start-ride",authCaptain,startRide);
rideRouter.post("/end-ride",authCaptain,endRide)

export default rideRouter;