import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div>
      <div className="h-screen pt-8  w-full justify-between flex-col flex items-start bg-[url('https://plus.unsplash.com/premium_vector-1747945618601-945aaba006b4?q=80&w=758&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-bottom">
        <img
          src="https://www.freepnglogos.com/uploads/black-uber-logo-png-6.png"
          alt=""
          className="w-30 ml-8"
        />
        <div className="bg-white w-full px-10 py-5">
          <h2 className="text-2xl font-bold">Get Started with Uber</h2>
          <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-2">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
