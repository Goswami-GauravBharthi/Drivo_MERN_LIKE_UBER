import React, { useState } from "react";
import { FaChevronDown, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { HiMiniDocumentCurrencyRupee } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

function ConfirmRidePopUpPanel({
  setConfirmRidePopUpPanel,
  setRidePopUpPanel,
  ride
}) {
    const navigate=useNavigate()
    const [otp, setOtp] = useState("");

    const handleChange = (e) => {
      const value = e.target.value.replace(/\D/g, "");
      if (value.length <= 4) setOtp(value);
    };

    const handleSubmit = async(e) => {
      e.preventDefault();
        const res = await api.post("/ride/start-ride", {
          rideId: ride._id,
          otp,
        });

        if(res.status===200){
            setConfirmRidePopUpPanel(false);
            setRidePopUpPanel(false);
            navigate("/captain-riding", { state: { ride} });
        }
    };
  return (
    <div>
      <div>
        {/* ====================Heading==================  */}
        <div className="flex justify-between  px-3 ">
          <h2 className="text-xl font-semibold mb-5">
            Confirm this ride to start
          </h2>
          <FaChevronDown
            onClick={() => setConfirmRidePopUpPanel(false)}
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
              {ride?.user?.fullName.firstName}
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
              <p className="text-gray-600">{ride?.pickup}</p>
            </div>
          </div>

          <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
            <FaMapMarkerAlt className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">652/11A</h3>
              <p className="text-gray-600">{ride?.destination}</p>
            </div>
          </div>

          <div className="my-3  flex items-center gap-3">
            <HiMiniDocumentCurrencyRupee className="text-2xl" />
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
              <p className="text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* ====================Ride Confirm  OTP ==================  */}

        <form onSubmit={handleSubmit}>
          <div className="w-full text-center">
            <h2 className="text-2xl mb-3">Enter OTP</h2>
            <input
              type="number"
              maxLength="4"
              onChange={(e)=>setOtp(e.target.value)}
              value={otp}
              required
              className="bg-gray-200 text-lime-800 tracking-[20px] outline-none px-4 py-3 text-2xl rounded-md"
              placeholder="OTP"
            />
          </div>

          {/* ====================Ride Confirm  Button ==================  */}
          <div className="flex items-center justify-between gap-3 mt-10">
            <div
              onClick={() => {
                setConfirmRidePopUpPanel(false);
                setRidePopUpPanel(false);
              }}
              className="w-full  text-center bg-red-700 py-2 rounded-lg text-lg font-semibold text-white"
            >
              Cancel
            </div>

            <button
              type="submit"
              className="w-full  text-center bg-green-700 py-2 rounded-lg text-lg font-semibold text-white"
            >
              {/* <Link to="/captain-riding">Confirm</Link> */}
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmRidePopUpPanel;
