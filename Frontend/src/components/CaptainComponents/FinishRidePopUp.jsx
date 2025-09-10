import React from "react";
import { FaMapMarkerAlt, FaUser, FaChevronDown } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function FinishRidePopUp({ setFinishRidePanel, rideData }) {
  const navigate = useNavigate();
  const handleFinishRide = async () => {
    const res = await api.post("/ride/end-ride", { rideId: rideData._id });

    if (res.status === 200) {
      navigate("/captain-home");
    }
  };
  return (
    <div>
      <div>
        {/* ====================Heading==================  */}
        <div className="flex justify-between  px-3 ">
          <h2 className="text-xl font-semibold mb-5">Finish this ride</h2>
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
              {rideData?.user?.fullName.firstName}
            </h2>
          </div>
          <h3 className="text-lg font-semibold text-gray-700">2.2 KM</h3>
        </div>

        {/* ====================Vehicle Info ==================  */}
        <div className="px-4">
          <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
            <FaUser className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">652/11A</h3>
              <p className="text-gray-600">{rideData?.pickup}</p>
            </div>
          </div>

          <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
            <FaMapMarkerAlt className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">652/11A</h3>
              <p className="text-gray-600">{rideData?.destination}</p>
            </div>
          </div>

          <div className="my-3  flex items-center gap-3">
            <HiMiniDocumentCurrencyRupee className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">₹{rideData?.fare} </h3>
              <p className="text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* ====================Ride Confirm  Button ==================  */}
        <div className="flex items-center justify-between gap-3 mt-10">
          <button
            onClick={handleFinishRide}
            className="w-full  text-center bg-green-700 py-2 rounded-lg text-lg font-semibold text-white"
          >
            Finish Ride
          </button>
        </div>

        <p className="text-gray-500 text-xs mt-6">
          Click on finish ride if you have complete the payment
        </p>
      </div>
    </div>
  );
}

export default FinishRidePopUp;
