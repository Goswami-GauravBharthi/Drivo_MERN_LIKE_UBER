import React, { useEffect } from "react";
import { useUserDataContext } from "../context/UserContext";

function UserProtectedWrapper({ children }) {
  const token = localStorage.getItem("token");

  const { navigate } = useUserDataContext();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    
  }, [token]);
  return <>{children}</>;
}

export default UserProtectedWrapper;
