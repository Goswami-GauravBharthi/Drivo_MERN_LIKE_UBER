import Captain from "../models/captain.model.js";
import Ride from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import { getDistanceAndTime } from "./maps.service.js";

export async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required to calculate fare");
  }
  let { distance, time } = await getDistanceAndTime(pickup, destination);

  distance = distance / 1000; //convert to km
  time = time / 60; //convert to minutes
  //   console.log("Distance and Time:", distance, time);

  const baseFare = {
    auto: 15,
    car: 25,
    motorcycle: 10,
  };

  const perKmRate = {
    auto: 12,
    car: 18,
    motorcycle: 8,
  };

  const perMinRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fares = {};

  for (const type of Object.keys(baseFare)) {
    fares[type] = Math.round(
      baseFare[type] + distance * perKmRate[type] + time * perMinRate[type]
    );
  }
  return fares;
}

//otp generate

export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
  otp,
}) => {

  if (!user || !pickup || !destination || !vehicleType || !otp) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = new Ride({
    user,
    pickup,
    destination,
    vehicleType,
    otp,
    fare: fare[vehicleType],
  });

  await ride.save();

  return ride;
};

export const confirmRideService = async (rideId, captainId) => {
  if (!rideId || !captainId) {
    throw new Error("All fields are required");
  }

  await Ride.findOneAndUpdate(
    { _id: rideId },
    { status: "accepted", captain: captainId }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain").select("+otp"); // 👈 This line populates the captain field

  return ride;
};


export const startRideService=async({rideId,captain,otp})=>{
    if(!rideId || !captain || !otp){
        throw new Error("All fields are required");
    }
    const ride=await Ride.findOne({ _id: rideId }).populate("user").populate("captain").select("+otp");
    if(!ride){
        throw new Error("Ride not found");
    }

    if(otp!==ride.otp){
        console.log(ride.otp)
        throw new Error("OTP is wrong");
        
    }
    await Ride.findOneAndUpdate({ _id: rideId }, { status: "ongoing" });

      sendMessageToSocketId(ride.user.socketId, {
        event: "ride-start",
        data: ride,
      })

      return ride;
}