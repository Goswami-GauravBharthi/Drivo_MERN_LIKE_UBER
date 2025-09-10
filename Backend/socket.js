// socket.js
import { Server } from "socket.io";
import User from "./models/user.model.js";
import Captain from "./models/captain.model.js";

let io;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // change to your frontend domain for security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = await data;

      console.log(`User joined: ${userId} as ${userType}`);

      if (userType === "user") {
        const user = await User.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else if (userType === "captain") {
        await Captain.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      // Convert to GeoJSON Point
      const geoLocation = {
        type: "Point",
        coordinates: [location.lng, location.ltd], // IMPORTANT: [lng, lat]
      };

      const updatedCaptain = await Captain.findByIdAndUpdate(userId, {
        location: geoLocation,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
}

export function sendMessageToSocketId(socketId, msgObject) {
  if (!io) {
    console.error("Socket.io not initialized. Call initializeSocket first.");
    return;
  }
 
  io.to(socketId).emit(msgObject.event, msgObject.data);
}
