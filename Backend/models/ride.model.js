import mongoose, { Schema } from "mongoose";

const rideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
   
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    requires: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted","ongoing", "completed","cancelled"],
    default: "pending",
  },
  duration:{
    type: Number, // in seconds
  },
  distance:{
    type:Number
  },
  paymentId:{
    type:String
  },
  orderId:{
    type:String
  },
  signature:{
    type:String
  },
  otp:{
    type:String,
    select:false,
    required:true
  }
});


const Ride=mongoose.model("Ride",rideSchema)

export default Ride;