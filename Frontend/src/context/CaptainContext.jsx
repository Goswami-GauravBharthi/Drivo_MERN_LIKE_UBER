import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const CaptainDataContext = createContext();

function CaptainContext({ children }) {
  const navigate = useNavigate();

  const [captain, setCaptain] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  const value = {
    captain,
    setCaptain,
    navigate,
  };

  const getCaptainProfile = async () => {
    try {
      const response = await api.get("/captain/profile");
     setCaptain(response.data.captain);
      
    } catch (error) {
      console.error("Error fetching captain profile:", error);
    }
  };

  useEffect(() => {
    getCaptainProfile();
  }, []);

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
}

export const useCaptainDataContext = () => {
  const context = useContext(CaptainDataContext);
  if (!context) {
    throw new Error(
      "useCaptainDataContext must be used within CaptainContextProvider"
    );
  }
  return context;
};

export default CaptainContext;
