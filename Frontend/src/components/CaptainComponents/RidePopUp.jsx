import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";

function RidePopUp({
  setRidePopUpPanel,
  setConfirmRidePopUpPanel,
  ride,
  confirmRideFn,
}) {
  return (
    <div>
      <div>
        {/* ====================Heading==================  */}
        <div className="flex justify-between  px-3">
          <h2 className="text-xl font-semibold mb-5">New Ride Available !</h2>
          <FaChevronDown
            onClick={() => setRidePopUpPanel(false)}
            className="text-2xl text-gray-500"
          />
        </div>

        {/* User Image */}

        <div className="flex justify-between items-center px-3 bg-yellow-300/90 rounded-lg p-3">
          <div className="flex gap-2 items-center">
            <img
              className="w-15 h-15  rounded-full"
              src="https://tse1.mm.bing.net/th/id/OIP.PkFenohHn8RbSMjB8E4SZwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              alt=""
            />
            <h2 className="text-lg font-semibold text-gray-600">
              {ride?.user?.fullName.firstName +
                " " +
                ride?.user?.fullName.lastName}
            </h2>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">2.2 KM</h3>
        </div>

        {/* ====================Vehicle Info ==================  */}
        <div className="px-4">
          <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
            <FaUser className="text-2xl" />
            <div>
              <p className="text-gray-600">{ride?.pickup}</p>
            </div>
          </div>

          <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
            <FaMapMarkerAlt className="text-2xl" />
            <div>
              <p className="text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          <div className="my-3  flex items-center gap-3">
            <HiMiniDocumentCurrencyRupee className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* ====================Ride Confirm  Button ==================  */}
        <div className="flex items-center justify-between gap-3 mt-10">
          <button
            onClick={() => setRidePopUpPanel(false)}
            className="w-full  bg-gray-500 py-2 rounded-lg text-lg font-semibold text-white"
          >
            Ignore
          </button>

          <button
            onClick={() => {
                confirmRideFn()
            }}
            className="w-full  bg-green-700 py-2 rounded-lg text-lg font-semibold text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default RidePopUp;
