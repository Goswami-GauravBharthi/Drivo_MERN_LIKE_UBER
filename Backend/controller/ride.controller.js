import Ride from "../models/ride.model.js";
import {
  getAddressCoordinate,
  getCaptainInTheRadius,
} from "../services/maps.service.js";
import { confirmRideService, createRideService, getFare, startRideService } from "../services/ride.service.js";
import { sendMessageToSocketId } from "../socket.js";

function getOtp(length = 4) {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

export const createRide = async (req, res) => {
  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
      otp: getOtp(),
    });

    const pickupCoordinate = await getAddressCoordinate(pickup);
    const lat = Number(pickupCoordinate.ltd);
    const lng = Number(pickupCoordinate.lng);
    const captainInRadius = await getCaptainInTheRadius(lat, lng, 200000);

    ride.otp = "";

    const rideWithUser = await Ride.findOne({ _id: ride._id }).populate("user");

    captainInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    // console.log("captainInRadius : ", captainInRadius);
    res.status(201).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFareController = async (req, res) => {
  try {
    const fares = await getFare(req.query.pickup, req.query.destination);

    res.status(200).json(fares);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const confirmRide = async (req, res) => {

    const {rideId}=req.body;

  try {
    const ride=await confirmRideService(rideId,req.captain._id);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirm",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const startRide=async(req,res)=>{
    const {rideId,otp}=req.body;


    try {
        const ride=await startRideService({rideId,captain:req.captain,otp});

        return res.status(200).json(ride)
    } catch (error) {
        console.log(error)
         res.status(500).json({ error: error.message });
    }
}

export const endRide=async(req,res)=>{
    const {rideId}=req.body;
    try {   
        const ride=await Ride.findOneAndUpdate({_id:rideId,captain:req.captain._id},{status:"completed"},{new:true}).populate("user captain");

        sendMessageToSocketId(ride.user.socketId,{
            event:"ride-completed",
            data:ride
        })
        return res.status(200).json(ride);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}