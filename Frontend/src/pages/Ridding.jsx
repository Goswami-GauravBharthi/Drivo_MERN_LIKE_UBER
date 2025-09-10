import React from 'react'
 import { AiFillHome } from "react-icons/ai";
 import {Link, useLocation, useNavigate} from "react-router-dom"
import { useSocket } from '../context/SocketContext';

function Ridding() {

    const navigate=useNavigate();
    const { socketRef } = useSocket();
    const location=useLocation();
    const {ride}=location.state||{};

    socketRef.current?.on("ride-completed", (data) => {
       navigate("/home")
    });

  return (
    <div className="h-screen md:max-w-500px">
      <Link to='/home' className='absolute right-2 top-2 bg-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer'>
        <AiFillHome  className='text-2xl'/>
      </Link>

      {/* image map */}
      <div className="h-[50%]">
        <img
          className="h-full w-full object-cover"
          src="https://plus.unsplash.com/premium_vector-1726136905676-b393055f22a9?q=80&w=880&auto=format&fit=crop"
          alt="Background"
        />
      </div>

      <div className="h-1/2 p-4 bg-white">
        <div className="flex items-center justify-between">
          <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco/v1554506931/navigation/UberXL.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">{ride?.captain?.fullName?.firstName}</h2>
            <h4 className="text-xl font-semibold -mb-1 -mt-1">{ride?.captain?.vehicle?.plate}</h4>
            <p className="text-sm text-gray-600">{ride?.captain?.vehicle?.vehicleType}</p>
          </div>
        </div>

        {/* ====================Vehicle Info ==================  */}
        <div className="px-4">
          <div className="my-3 border-b-2 pb-3 border-gray-400 flex items-center gap-3">
            {/* <FaMapMarkerAlt className="text-2xl" /> */}
            <div>
              <h3 className="text-lg font-medium">652/11A</h3>
              <p className="text-gray-600">{ride?.pickup}</p>
            </div>
          </div>

          <div className="my-3  flex items-center gap-3">
            {/* <HiMiniDocumentCurrencyRupee className="text-2xl" /> */}
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
              <p className="text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button className="w-full  bg-green-800 py-2 rounded-lg text-lg font-semibold text-white">
          Make a Payment
        </button>
      </div>

    </div>
  );
}

export default Ridding