import React, { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// Create a context to share socket functions
const SocketContext = createContext();

export function SocketProvider({ children }) {
  // Store the socket connection in a ref
  const socketRef = useRef();

  useEffect(() => {
    // Connect to backend using WebSocket
    const socket = io(import.meta.env.VITE_BASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    // Save the socket instance
    socketRef.current = socket;

    // Log connection status
    socket.on("connect", () => {
      console.log("✅Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌Disconnected");
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Emit an event with data
  const sendMessage = (event, data) => {
    // console.log("Sending message:", event, data);
    socketRef.current?.emit(event, data);
  };

  // Listen for an event
  const receiveMessage = (event, callback) => {
    socketRef.current?.on(event, callback);
  };

  return (
    <SocketContext.Provider value={{ sendMessage, receiveMessage, socketRef }}>
      {children}
    </SocketContext.Provider>
  );
}

// Hook to use socket functions
export const useSocket = () => useContext(SocketContext);
