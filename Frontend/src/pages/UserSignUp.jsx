import React, { useState } from "react";

import { Link } from "react-router-dom";
import { userRegister } from "../api/api";
import { useUserDataContext } from "../context/UserContext";

const UserRegister = () => {
  const { setUser, navigate } = useUserDataContext();
  const handleUserRegister = async (e) => {
    e.preventDefault();
    const dataObject = new FormData(e.target);
    const formData = Object.fromEntries(dataObject.entries());

    const newUser = {
      fullName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      email: formData.email,
      password: formData.password,
    };

    const res = await userRegister(newUser);

    if (res.status === 201) {
      setUser(res.data.user);
       localStorage.setItem("token", res.data.token);
      navigate("/home");
    }

    console.log(res);
  };
  return (
    <div className="h-screen bg-gray-400/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleUserRegister} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your first name"
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
              type="text"
              name="lastName"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your last name"
            />
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
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors outline-0"
          >
            Sign Up
          </button>

          <Link
            to="/captain-signup"
            className="block w-full bg-[#298fc9] text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center mt-2"
          >
            Sign Up as Captain
          </Link>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
