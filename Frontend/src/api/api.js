import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  //   withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userRegister = async (newUser) => {
  return await api.post("/user/register", newUser);
};

export const userLogin=async(userData)=>{
    return await api.post("/user/login",userData)
}
export const userLogout=async(token)=>{
    return await api.get("/user/logout",{headers:{
        Authorization:`Bearer ${token}`
    }})
}

/*-------------------------Captain authentication-------------------------------------*/

export const captainRegister=async(captainData)=>{
    return await api.post("/captain/register",captainData)
}

export const captainLogin=async(captainData)=>{
    return await api.post("/captain/login",captainData)
}

export default api;
//!-------------------------Ride Suggestion-------------------------------------

export const getFare = async (pickup, destination) => {
  return await api.get("/ride/get-fare", {
    params: { pickup, destination },
  });
};

export const createRide = async (rideData) => {
    console.log("all done")
    return await api.post("/ride/create", rideData);
}