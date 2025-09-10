import React, {
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import LocationSearchPanel from "../components/UserComponent/LocationSearchPanel";
import VehiclePanel from "../components/UserComponent/VehiclePanel";
import ConfirmRide from "../components/UserComponent/ConfirmRide";
import LookingForDriver from "../components/UserComponent/LookingForDriver";
import WaitingForDriver from "../components/UserComponent/WaitingForDriver";
import api, { createRide, getFare } from "../api/api";
import { useSocket } from "../context/SocketContext";
import { useUserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useUserDataContext();
  const { sendMessage, receiveMessage, socketRef } = useSocket();

  const [ride, setRide] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    sendMessage("join", { userType: "user", userId: user?._id });
  }, [user]);

  socketRef.current?.on("ride-confirm",(data)=>{
    setRide(data)
    setLookingRidePanel(false)
    setWaitingForDriver(true)
  })

  socketRef.current?.on("ride-start",(data)=>{
    setWaitingForDriver(false)
    navigate("/ridding",{state:{ride}});
  })


  const panelDiv = useRef(null);
  const [full, setFull] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [lookingRidePanel, setLookingRidePanel] = useState(false);
  const lookingRidePanelRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [suggestion, setSuggestion] = useState([]);
  const [activeField, setActiveField] = useState("");

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState("");

  useLayoutEffect(() => {
    if (!panelDiv.current) return;

    gsap.to(panelDiv.current, {
      duration: 0.6,
      ease: "power3.out",
      top: full ? 0 : "auto",
      bottom: full ? "auto" : 0,
      height: full ? "100%" : "30%",
      opacity: full ? 1 : 0.95,
      scale: full ? 1 : 0.98,
      backdropFilter: full ? "blur(100px)" : "blur(0px)",
    });
  }, [full]);

  useLayoutEffect(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useLayoutEffect(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useLayoutEffect(() => {
    if (lookingRidePanel) {
      gsap.to(lookingRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [lookingRidePanel]);

  useLayoutEffect(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);

  useEffect(() => {
    if (!pickup) {
      setSuggestion([]); // reset if input empty
      return;
    }

    // debounce logic
    const handler = setTimeout(async () => {
      try {
        const res = await api.get("/map/get-suggestion", {
          params: { input: pickup },
        });

        setSuggestion(res.data.suggestion || []);
      } catch (error) {
        console.error("Autocomplete error:", error);
      }
    }, 500); // wait 500ms after user stops typing

    // cleanup (cancel timeout if user types again)
    return () => clearTimeout(handler);
  }, [pickup]);

  useEffect(() => {
    if (!destination) {
      setSuggestion([]); // reset if input empty
      return;
    }

    // debounce logic
    const handler = setTimeout(async () => {
      try {
        const res = await api.get("/map/get-suggestion", {
          params: { input: destination },
        });

        setSuggestion(res.data.suggestion || []);
       
      } catch (error) {
        console.error("Autocomplete error:", error);
      }
    }, 800); // wait 800ms after user stops typing

    // cleanup (cancel timeout if user types again)
    return () => clearTimeout(handler);
  }, [destination]);

  const nextButton = async () => {
    if (pickup && destination) {
      const res = await getFare(pickup, destination); //from api.js
      setFare(res.data);
      setVehiclePanel(true);
      setFull(false);
    }
  };

  const createRideFn = async () => {
    const res = await createRide({ pickup, destination, vehicleType }); //call the function from api.js
   
  };
  return (
    <div className="h-screen relative md:max-w-[500px]">
      <h2 className=" rounded-3xl font-bold text-3xl absolute left-5 top-5 bg-white px-3 py-1 text-[#5d47bf]">
        Drivo 🚘
      </h2>

      <div className="h-screen">
        <img
          className="h-full w-full object-cover"
          src="https://plus.unsplash.com/premium_vector-1726136905676-b393055f22a9?q=80&w=880&auto=format&fit=crop"
          alt="Background"
        />
      </div>

      {/* panel div */}
      <div
        ref={panelDiv}
        className="bg-white absolute w-full p-5 rounded-lg"
        style={{ bottom: 0 }}
      >
        <div className="h-[30%]">
          <h4 className="text-2xl font-semibold flex justify-between">
            Find a trip
            <span
              onClick={() => setFull(false)}
              className={`${full ? "cursor-pointer" : "hidden"}`}
            >
              ⬇️
            </span>
          </h4>
          <form>
            <input
              type="text"
              onChange={(e) => {
                setPickup(e.target.value);
                setActiveField("pickup");
              }}
              value={pickup}
              onClick={() => setFull(true)}
              name="pickup"
              required
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full my-3 outline-cyan-700"
              placeholder="Add a Pick Location"
            />
            <input
              type="text"
              onChange={(e) => {
                setDestination(e.target.value);
                setActiveField("destination");
              }}
              value={destination}
              required
              name="destination"
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg w-full outline-cyan-700"
              placeholder="Enter your destination"
            />
          </form>
          {full && (
            <button
              onClick={() => {
                nextButton();
              }}
              className="text-center bg-purple-800 w-full my-5 py-1 text-xl rounded-md text-white"
            >
              Next
            </button>
          )}
        </div>

        <div className={`${full ? "h-[70%]" : "hidden"} mt-5 `}>
          <LocationSearchPanel
            setFull={setFull}
            setVehiclePanel={setVehiclePanel}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* choose uber vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full md:w-[500px]  translate-y-full"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      {/* confirm ride panel */}
      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full md:w-[500px]  translate-y-full"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRideFn={createRideFn}
          setLookingRidePanel={setLookingRidePanel}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* Looking for rider. */}
      <div
        ref={lookingRidePanelRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full md:w-[500px]  translate-y-full"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setLookingRidePanel={setLookingRidePanel}
        />
      </div>

      {/* Waiting for rider. */}
      <div
        ref={waitingForDriverRef}
        className="fixed z-10 bottom-0 bg-white p-3 w-full md:w-[500px] "
      >
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
}

export default Home;
