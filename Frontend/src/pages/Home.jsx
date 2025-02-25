import { useRef, useState, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketDataContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmedRidePanelOpen, setConfirmedRidePanelOpen] = useState(false);
  const [vehicleFoundPanelOpen, setVehicleFoundPanelOpen] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const confirmedRideRef = useRef(null);
  const panelRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const { userData } = useContext(UserDataContext);
  const { sendMessage, reciveMessage } = useContext(SocketDataContext);

  useEffect(() => {
    sendMessage("join", { userType: "user", userId: userData._id });
  }, [userData]);

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/getsuggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data.autoCompleteSuggestion.predictions);
      if (!pickup) {
        setPickupSuggestions([]);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleDestinationChange = async (e) => {
    setDrop(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/getsuggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(
        response.data.autoCompleteSuggestion.predictions
      );
      if (!drop) {
        setDestinationSuggestions([]);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setPickup("");
    setDrop("");
  };
  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination: drop,
        vehicleType,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
  };

  const getFare = async () => {
    if (!pickup || !drop) {
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/getfare`,
        {
          params: {
            pickup,
            drop,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setFare(response.data.fare);
      setVehiclePanelOpen(true);
    } catch (error) {
      setFare({});
    }
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height:
        panelOpen && !(confirmedRidePanelOpen && vehiclePanelOpen)
          ? "70%"
          : "0%",

      padding: panelOpen ? "24" : "0",
      display: panelOpen ? "block" : "none",
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanelOpen]);
  useGSAP(() => {
    gsap.to(confirmedRideRef.current, {
      transform: confirmedRidePanelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmedRidePanelOpen]);
  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFoundPanelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehicleFoundPanelOpen]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
        className="w-16 absolute mt-9 ml-9 cursor-pointer"
      />
      <div className="h-screen w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen w-full absolute top-0 ">
        <div className="h-[30%] p-6  bg-white relative ">
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-6 right-6 text-2xl"
          >
            {" "}
            <i
              className={`ri-arrow-up-wide-line text-gray-300 ${
                panelOpen ? "hidden" : "visible"
              }`}
            ></i>
            <i
              className={`ri-arrow-down-wide-line text-gray-300 ${
                panelOpen ? "visible" : "hidden"
              }`}
            ></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="absolute h-16 w-1 bg-gray-700 top-[45%] left-10 rounded-full "></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={(e) => handlePickupChange(e)}
              className="bg-[#eeeeee] px-12 py-2 text-base outline-none rounded-lg w-full mt-5 placeholder:text-sm placeholder:text-black"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => {
                setActiveField("destination");
                setPanelOpen(true);
              }}
              value={drop}
              onChange={(e) => handleDestinationChange(e)}
              className="bg-[#eeeeee] px-12 py-2 text-base outline-none rounded-lg w-full mt-3 placeholder:text-sm placeholder:text-black"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={() => {
              getFare();
            }}
            className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className={`h-[0%] bg-white `}>
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPickup={setPickup}
            setDrop={setDrop}
            activeField={activeField}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          fare={fare}
          setVehicleType={setVehicleType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        />
      </div>
      <div
        ref={confirmedRideRef}
        className={`fixed w-full z-10 ${
          confirmedRidePanelOpen ? "bottom-0" : "bottom-[-150px]"
        } translate-y-full bg-white px-5 py-6 `}
      >
        <ConfirmedRide
          createRide={createRide}
          fare={fare[vehicleType]}
          vehicleType={vehicleType}
          pickup={pickup}
          drop={drop}
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className={`fixed w-full z-10 ${
          vehicleFoundPanelOpen ? "bottom-0" : "bottom-[-200px]"
        }  bg-white px-5 py-6 `}
      >
        <LookingForDriver
          fare={fare[vehicleType]}
          vehicleType={vehicleType}
          pickup={pickup}
          drop={drop}
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
          waitingForDriver={waitingForDriver}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};
export default Home;
