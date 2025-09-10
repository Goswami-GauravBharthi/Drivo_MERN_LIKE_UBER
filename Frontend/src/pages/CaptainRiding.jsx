import gsap from "gsap";
import React, { useLayoutEffect, useRef, useState } from "react";
import FinishRidePopUp from "../components/CaptainComponents/FinishRidePopUp";
import { useLocation } from "react-router-dom";

function CaptainRiding() {

    const [finishRidePanel,setFinishRidePanel]=useState(false)
    const finishRidePanelRef=useRef(null);
    const location=useLocation()
    const {ride}=location.state||{};

     useLayoutEffect(() => {
       if (finishRidePanel) {
         gsap.to(finishRidePanelRef.current, {
           transform: "translateY(0)",
         });
       } else {
         gsap.to(finishRidePanelRef.current, {
           transform: "translateY(100%)",
         });
       }
     }, [finishRidePanel]);


  return (
    <div className="h-screen md:max-w-[500px] bg-white  relative">
      <h2 className=" rounded-3xl font-bold text-3xl absolute left-5 top-5 bg-white px-3 py-1 text-[#5d47bf]">
        Drivo 🚘
      </h2>

      {/* bg Image */}
      <div className="h-4/5">
        <img
          className=" h-full md:w-full "
          src="https://plus.unsplash.com/premium_vector-1732449249283-31c965625e10?q=80&w=722&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
        />
      </div>

      <div className="h-1/5 p-6  bg-[#ffd991]">
        <h4 className="text-xl font-semibold text-center mb-3">4 KM away</h4>
        <button
          onClick={() => setFinishRidePanel(true)}
          className="w-full  text-center bg-green-700 py-2 rounded-lg text-lg font-semibold text-white"
        >
          Complete Ride
        </button>
      </div>

      {/* finish Ride panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full md:w-[500px]  translate-y-full "
      >
        <FinishRidePopUp
          rideData={ride}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
}

export default CaptainRiding;
