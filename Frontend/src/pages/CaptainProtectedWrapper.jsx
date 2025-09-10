import React, { useEffect } from "react";
import { useCaptainDataContext } from "../context/CaptainContext";


function CaptainProtectedWrapper({ children }) {

    const token = localStorage.getItem("token");
    
      const { navigate,captain } = useCaptainDataContext()
    
      useEffect(() => {
        // console.log(captain)
        if (!token&&!captain.email) {
          navigate("/captain-login");
        }
      }, [token]);
  return <>{children}</>;
}

export default CaptainProtectedWrapper;
