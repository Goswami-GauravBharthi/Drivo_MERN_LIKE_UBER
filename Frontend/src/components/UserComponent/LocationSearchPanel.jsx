import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";

function LocationSearchPanel({
  setFull,
  setVehiclePanel,
  suggestion,
  setSuggestion,
  setPickup,
  setDestination,
  activeField,
}) {
  const location = [
    "24B Near kappors cafe, Gaurav coding school , Bhavnagar",
    "24B Near manhotra cafe, Gaurav coding colleage , Bhavnagar",
    "24B Near dave cafe, hello coding school , Bhavnagar",
  ];
  return (
    <div className="overflow-y-scroll h-full">
      {suggestion?.map((value, index) => (
        <div
          key={index}
          onClick={() => {
            console.log(activeField)
            if (activeField === "pickup") {
              setPickup(value.label);
            } else {
              setDestination(value.label);
            }
            setSuggestion([])
            // setVehiclePanel(true);
            // setFull(false)
          }}
          className="active:border-black border-2 border-gray-300 p-2 rounded-lg flex items-center justify-start my-4 gap-4 "
        >
          <h2 className="bg-[#eee] h-10 flex items-center justify-center  w-16 rounded-full">
            <FaLocationDot />
          </h2>
          <h4 className="text-lg font-medium ">{value.label}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
