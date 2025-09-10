import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper";
import Ridding from "./pages/Ridding";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainRiding from "./pages/CaptainRiding";

function App() {
  return (
    <div className="md:w-full md:h-screen md:bg-cyan-900 md:flex md:justify-center relative">
      <div className="absolute text-3xl text-white top-[50%] left-2  leading-20 font-bold capitalize hidden md:block">
        this is made for <br /> mobile screen ..
        <br />
        Open in Mobile
      </div>
      <div className="md:min-w-[500px]">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
              fontSize: "1rem",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Start />} />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
            }
          />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserRegister />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route path="/captain-signup" element={<CaptainSignUp />} />
          <Route path='/captain-riding' element={<CaptainRiding />} />
          <Route path="/ridding" element={<Ridding />} />

          <Route
            path="/captain-home"
            element={
              <CaptainProtectedWrapper>
                <CaptainHome />
              </CaptainProtectedWrapper>
            }
          />
          <Route
            path="/captain/logout"
            element={
              <CaptainProtectedWrapper>
                <CaptainLogout />
              </CaptainProtectedWrapper>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
