import React from "react";
import { FaChevronDown } from "react-icons/fa6";

function LookingForDriver({
  pickup,
  destination,
  fare,
  vehicleType,
  setLookingRidePanel,
}) {
  return (
    <div>
      {/* ====================Heading==================  */}
      <div className="flex justify-between  px-3">
        <h2 className="text-xl font-semibold mb-5">Looking For Ride </h2>

        <FaChevronDown
          onClick={() => setLookingRidePanel(false)}
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
          {/* <FaUser className="text-2xl" /> */}
          <div>
            <p className="text-gray-600">{pickup.slice(0, 30)}...</p>
          </div>
        </div>

        <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
          {/* <FaMapMarkerAlt className="text-2xl" /> */}
          <div>
            <p className="text-gray-600">{destination.slice(0, 30)}...</p>
          </div>
        </div>

        <div className="my-3  flex items-center gap-3">
          {/* <HiMiniDocumentCurrencyRupee className="text-2xl" /> */}
          <div>
            <h3 className="text-lg font-medium">₹{fare[vehicleType]} </h3>
            <p className="text-gray-600">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookingForDriver;
