import React from "react";
import { Link } from "react-router-dom";
import { captainLogin } from "../api/api";
import { useCaptainDataContext } from "../context/CaptainContext";

function CaptainLogin() {
  const { navigate, setCaptain } = useCaptainDataContext();
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const captainData = Object.fromEntries(formData.entries());
    // console.log("Captain Login Data:", captainData);

    const res = await captainLogin(captainData);

    // console.log(res)
    if (res.status === 200) {
        e.target.reset();
      setCaptain(res.data.captain);
      localStorage.setItem("token", res.data.token);
      navigate("/captain-home");
    }

  };

  return (
    <div className="min-h-screen bg-gray-400/70 flex flex-col gap-5 items-center justify-center px-4">
      <img
        src="https://www.freepnglogos.com/uploads/black-uber-logo-png-6.png"
        alt="Uber Logo"
        className="w-30 ml-8"
      />

      <div className="w-full max-w-sm bg-white/80 rounded-xl shadow-xl p-6 border border-white/40 text-[#1a1a1a]">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1a1a1a]">
          Captain Login
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-[#2c2c2c]"
            >
              Captain Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="captain@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white text-[#1a1a1a] placeholder-[#6b7280] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8bcec7]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-[#2c2c2c]"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white text-[#1a1a1a] placeholder-[#6b7280] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8bcec7]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1a1a1a] text-white font-semibold rounded-lg hover:bg-[#333] transition duration-300"
          >
            Log In as Captain
          </button>

          <p className="text-sm text-[#2c2c2c] mt-6 text-center">
            Not a Captain yet?
            <Link
              to="/captain-signup"
              className="underline text-[#1a1a1a] ml-2 hover:text-[#333]"
            >
              Register Here
            </Link>
          </p>
        </form>
      </div>

      <Link
        to="/login"
        className="w-full max-w-sm py-3 bg-[#298fc9] text-white font-semibold rounded-lg hover:bg-[#333] transition duration-300 text-center"
      >
        Sign in As Rider
      </Link>
    </div>
  );
}

export default CaptainLogin;
