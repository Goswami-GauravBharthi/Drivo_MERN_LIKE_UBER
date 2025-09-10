import React, { useState } from "react";
import { Link } from "react-router-dom";
import { captainRegister } from "../api/api";
import { useCaptainDataContext } from "../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainSignUp = () => {
  const { navigate, setCaptain } = useCaptainDataContext();
  
  const handleCaptainSubmit = async (e) => {
    e.preventDefault();

    const dataObject = new FormData(e.target);
    const formData = Object.fromEntries(dataObject.entries());

    const captainData = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.color,
        plate: formData.plate,
        capacity: formData.capacity,
        vehicleType: formData.type,
      },
    };

 

    const res = await captainRegister(captainData);
    if (res.status === 201) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }
    else{
        console.log(res.data.errors)
        toast.error(res.data.errors[0].msg)
    }

       e.target.reset();

  };

  return (
    <div className="h-screen bg-gray-400/70 flex  md:items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-xl p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Join as a Captain
        </h1>

        <form
          onSubmit={handleCaptainSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* fullName */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="First name"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          {/* vehicle info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="vehicleColor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Color
              </label>
              <input
                id="vehicleColor"
                name="color"
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder=" vehicle color"
              />
            </div>

            <div>
              <label
                htmlFor="plate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Plate
              </label>
              <input
                id="plate"
                name="plate"
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Vehicle plate"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Capacity
              </label>
              <input
                id="capacity"
                name="capacity"
                type="number"
                min={0}
                max={4}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Enter vehicle capacity"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="vehicleType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Vehicle Type
              </label>
              <select
                id="vehicleType"
                name="type"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
              >
                <option value="">vehicle Type</option>
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors outline-0">
              Sign Up as Captain
            </button>
          </div>

          <div className="md:col-span-2">
            <Link
              to="/signup"
              className="block w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors outline-0 text-center"
            >
              Sign Up as User
            </Link>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/captain-login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
