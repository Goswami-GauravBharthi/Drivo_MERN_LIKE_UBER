import React, { useCallback } from "react";
import { RiUserLocationFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";

// ✅ React.memo stops re-render unless props change
const VehiclePanel = React.memo(function VehiclePanel({
  setVehiclePanel,
  setConfirmRidePanel,
  fare,
  setVehicleType,
}) {
  // ✅ useCallback ensures these functions have stable references
  const handleClose = useCallback(() => {
    setVehiclePanel(false);
  }, [setVehiclePanel]);

  const handleSelect = useCallback(
    (type) => {
      setVehicleType(type);
      setConfirmRidePanel(true);
    },
    [setVehicleType, setConfirmRidePanel]
  );

  return (
    <>
      <div className="flex justify-between px-3">
        <h2 className="text-xl font-semibold mb-5">Choose a vehicle</h2>

        <FaChevronDown
          onClick={handleClose}
          className="text-2xl text-gray-500 cursor-pointer"
        />
      </div>

      {/* Car */}
      <div
        onClick={() => handleSelect("car")}
        className="flex items-center justify-between rounded-lg px-2 py-4 my-1 bg-gray-200 cursor-pointer"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
          alt="car"
        />
        <div className="w-1/2">
          <h4 className="font-semibold text-sm flex">
            Uber go
            <span>
              <RiUserLocationFill />
            </span>
            4
          </h4>
          <h5 className="text-xl font-semibold">2 mins away</h5>
          <p className="text-sm text-gray-700">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.car}</h2>
      </div>

      {/* Auto */}
      <div
        onClick={() => handleSelect("auto")}
        className="flex items-center justify-between rounded-lg px-2 py-4 my-1 bg-gray-200 cursor-pointer"
      >
        <img
          className="h-14"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt="auto"
        />
        <div className="w-1/2">
          <h4 className="font-semibold text-sm flex">
            Auto
            <span>
              <RiUserLocationFill />
            </span>
            4
          </h4>
          <h5 className="text-xl font-semibold">2 mins away</h5>
          <p className="text-sm text-gray-700">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.auto}</h2>
      </div>

      {/* Motorcycle */}
      <div
        onClick={() => handleSelect("motorcycle")}
        className="flex items-center justify-between rounded-lg px-2 py-4 my-1 bg-gray-200 cursor-pointer"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="motorcycle"
        />
        <div className="w-1/2">
          <h4 className="font-semibold text-sm flex">
            Moto
            <span>
              <RiUserLocationFill />
            </span>
            4
          </h4>
          <h5 className="text-xl font-semibold">2 mins away</h5>
          <p className="text-sm text-gray-700">Affordable, compact rides</p>
        </div>
        <h2 className="text-lg font-semibold">₹{fare.motorcycle}</h2>
      </div>
    </>
  );
});

export default VehiclePanel;
