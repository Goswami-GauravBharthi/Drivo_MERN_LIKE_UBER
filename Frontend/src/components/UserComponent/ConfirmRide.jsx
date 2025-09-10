import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";

function ConfirmRide({
  pickup,
  destination,
  fare,
  vehicleType,
  setConfirmRidePanel,
  setLookingRidePanel,
  createRideFn,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await createRideFn();
      setLookingRidePanel(true);
      setConfirmRidePanel(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-full">
      {/* ====================Heading==================  */}
      <div className="flex justify-between  px-3">
        <h2 className="text-xl font-semibold mb-5">Confirm Ride </h2>

        <FaChevronDown
          onClick={() => setConfirmRidePanel(false)}
          className="text-2xl text-gray-500"
        />
      </div>

      {/* ====================Vehicle Image==================  */}
      <div className="flex items-center justify-center">
        <img
          className="h-40"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
          alt=""
        />
      </div>

      {/* ====================Vehicle Info ==================  */}
      <div className="px-4">
        <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
          <FaUser className="text-2xl" />
          <div>
            <p className="text-gray-600">{pickup.slice(0, 30)}...</p>
          </div>
        </div>

        <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
          <FaMapMarkerAlt className="text-2xl" />
          <div>
            <p className="text-gray-600">{destination.slice(0, 30)}...</p>
          </div>
        </div>

        <div className="my-3  flex items-center gap-3">
          <HiMiniDocumentCurrencyRupee className="text-2xl" />
          <div>
            <h3 className="text-lg font-medium">₹{fare[vehicleType]} </h3>
            <p className="text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      {/* ====================Ride Confirm  Button ==================  */}
      <div className="mt-10">
        {/* <button
          onClick={async () => {
            await createRideFn();
            setLookingRidePanel(true);
            setConfirmRidePanel(false);
          }}
          className="w-full z-20 bg-green-800 py-2 rounded-lg text-lg font-semibold text-white"
        >
          {isLoading && (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {isLoading ? "Confirming..." : "Confirm"}
        </button> */}

        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className={`w-full z-20 bg-green-800 py-2 rounded-lg text-lg font-semibold text-white flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading && (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {isLoading ? "Confirming..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmRide;
