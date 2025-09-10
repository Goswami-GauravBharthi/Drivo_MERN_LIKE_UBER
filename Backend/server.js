import http from "http";
import app from "./app.js";
import connectDB from "./db/db.js";
import { initializeSocket } from "./socket.js";


await connectDB();
const server = http.createServer(app);

const io = initializeSocket(server);

server.listen(process.env.PORT, () => {
  console.log("Server is listening on ", process.env.PORT);
});
