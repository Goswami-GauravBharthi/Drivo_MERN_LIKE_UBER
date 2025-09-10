import React from "react";
import { FaChevronDown } from "react-icons/fa6";

function WaitingForDriver({ setWaitingForDriver, ride }) {
  return (
    <div>
      {/* ====================Heading==================  */}
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-5">Waiting For Rider </h2>
        <FaChevronDown
          onClick={() => setWaitingForDriver(false)}
          className="text-2xl text-gray-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <img
          className="h-20"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-medium">
            {ride?.captain?.fullName.firstName}
          </h2>
          <h4 className="text-xl font-semibold -mb-1 -mt-1">
            {ride?.captain?.vehicle?.plate}
          </h4>
          <p className="text-sm text-gray-600">
            {ride?.captain?.vehicle?.vehicleType}
          </p>
          <p className="text-lg font-semibold text-gray-600">{ride?.otp}</p>
        </div>
      </div>

      {/* ====================address info ==================  */}
      <div className="px-4">
        <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
          {/* <FaUser className="text-2xl" /> */}
          <div>
            <h3 className="text-lg font-medium">652/11A</h3>
            <p className="text-gray-600">{ride?.pickup.slice(0, 35)}..</p>
          </div>
        </div>

        <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
          {/* <FaMapMarkerAlt className="text-2xl" /> */}
          <div>
            <h3 className="text-lg font-medium">652/11A</h3>
            <p className="text-gray-600">{ride?.destination.slice(0, 35)}..</p>
          </div>
        </div>

        <div className="my-3  flex items-center gap-3">
          {/* <HiMiniDocumentCurrencyRupee className="text-2xl" /> */}
          <div>
            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
            <p className="text-gray-600">Cash</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingForDriver;
