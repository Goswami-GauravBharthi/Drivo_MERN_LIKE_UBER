import express, { Router } from "express";
import { authUser } from "../middlewares/auth.js";
import { getCoordinates, getDistanceTime, getSuggestion } from "../controller/map.controller.js";



const mapRouter = Router();

mapRouter.get("/get-coordinates", authUser, getCoordinates);

mapRouter.get("/get-distance-time", authUser, getDistanceTime);

mapRouter.get("/get-suggestion",authUser,getSuggestion)

export default mapRouter;
