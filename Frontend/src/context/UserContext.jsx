import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const UserDataContext = createContext();

function UserContext({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  const value = {
    user,
    setUser,
    navigate,
  };

  const getUserData = async () => {
    try {
      const res = await api.get("/user/profile");

      setUser(res.data.user);
    } catch (error) {
        console.log(error.message)
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <UserDataContext.Provider value={value}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
}

export const useUserDataContext = () => {
  const userData = useContext(UserDataContext);
  return userData;
};

export default UserContext;
