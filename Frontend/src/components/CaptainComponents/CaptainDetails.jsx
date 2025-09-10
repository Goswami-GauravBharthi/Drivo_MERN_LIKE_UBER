import React, { use } from "react";
import { BiSolidTime } from "react-icons/bi";
import { useCaptainDataContext } from "../../context/CaptainContext";

function CaptainDetails() {
  const { captain } = useCaptainDataContext();
  return (
    <div>
      <div className="flex justify-between my-5 py-3 text-slate-800">
        <div>
          <h4 className="text-xl font-medium">
            {captain.fullName.firstName}
           <br/> {captain.fullName.lastName}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">$295.20</h4>
          <p className="text-sm font-medium ">Earned</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 mt-2 bg-cyan-400/30 p-5 rounded-2xl">
        <div className="text-center">
          <BiSolidTime className="text-4xl mx-auto text-blue-400" />
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <BiSolidTime className="text-4xl mx-auto text-blue-400" />
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <BiSolidTime className="text-4xl mx-auto text-blue-400" />
          <h2 className="text-lg font-medium">10.2</h2>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
