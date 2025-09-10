import React, { useLayoutEffect, useRef, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainComponents/CaptainDetails";
import RidePopUp from "../components/CaptainComponents/RidePopUp";
import ConfirmRidePopUpPanel from "../components/CaptainComponents/ConfirmRidePopUpPanel";
import { useCaptainDataContext } from "../context/CaptainContext";
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import api from "../api/api";

function CaptainHome() {
  const { captain } = useCaptainDataContext();
  const { sendMessage, receiveMessage, socketRef } = useSocket();

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpPanelRef = useRef(null);

  useLayoutEffect(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopUpPanel]);

  useLayoutEffect(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopUpPanel]);

  useEffect(() => {
    if (!captain.email) return;

    sendMessage("join", { userType: "captain", userId: captain?._id });

    const intervalId = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          sendMessage("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [captain]);

  socketRef.current?.on("new-ride", (ride) => {
    setRide(ride);
    setRidePopUpPanel(true);
  });

  const confirmRideFn=async()=>{
    const res=await api.post("/ride/confirm",{rideId:ride._id})
    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true)
  }

  return (
    <div className="h-screen md:max-w-[500px] bg-white w-full relative">
      <h2 className=" rounded-3xl font-bold text-3xl absolute left-5 top-5 bg-white px-3 py-1 text-[#5d47bf]">
        Drivo 🚘
      </h2>

      {/* Logout Button */}
      <Link
        to="/captain/logout"
        className="absolute top-3 right-3 w-10 h-10 bg-gray-400 flex items-center justify-center rounded-full cursor-pointer"
      >
        <AiOutlineLogout className="text-3xl text-cyan-800 " />
      </Link>

      {/* bg Image */}
      <div className="h-[50%]">
        <img
          className=" w-full md:h-full  object-cover"
          src="https://images.unsplash.com/vector-1738926577749-2a1bf7a398f8?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>

      {/* Captain Details */}
      <div className="h-1/2 p-4 bg-white">
        <CaptainDetails />
      </div>

      {/*Ride PopUp Panel */}
      <div
        ref={ridePopUpPanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full md:w-[500px]  translate-y-full "
      >
        <RidePopUp
          ride={ride}
          confirmRideFn={confirmRideFn}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>

      {/* Confirm Ride PopUp Panel */}
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed h-screen z-10 bottom-0 bg-white p-3 w-full md:w-[500px]  translate-y-full "
      >
        <ConfirmRidePopUpPanel
          ride={ride}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
    </div>
  );
}

export default CaptainHome;
