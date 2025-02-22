import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

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
  const onSubmitHandler = (e) => {
    e.preventDefault();

    setPickup("");
    setDrop("");
  };
  useEffect(() => {
    if (panelOpen === false) {
      setVehiclePanelOpen(false);
    } else if (confirmedRidePanelOpen === true) {
      setVehiclePanelOpen(false);
      setPanelOpen(false);
    } else if (vehicleFoundPanelOpen === true) {
      setConfirmedRidePanelOpen(false);
    } else if (vehicleFoundPanelOpen === false) {
      setConfirmedRidePanelOpen(false);
    }
  }, [panelOpen, confirmedRidePanelOpen, vehicleFoundPanelOpen]);

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height:
        panelOpen && !(confirmedRidePanelOpen && vehiclePanelOpen)
          ? "70%"
          : "0%",

      padding: panelOpen ? "24" : "0",
      display: panelOpen ? "block" : "none",
    });
  }, [panelOpen, confirmedRidePanelOpen, vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanelOpen ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanelOpen]);
  useGSAP(() => {
    gsap.to(confirmedRideRef.current, {
      transform:
        confirmedRidePanelOpen && !vehicleFoundPanelOpen
          ? "translateY(0)"
          : "translateY(100%)",
    });
  }, [confirmedRidePanelOpen, vehicleFoundPanelOpen]);
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
    <div className="h-screen relative">
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
        <div className="h-[30%] p-6 bg-white relative ">
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
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eeeeee] px-12 py-2 text-base outline-none rounded-lg w-full mt-5 placeholder:text-sm placeholder:text-black"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="bg-[#eeeeee] px-12 py-2 text-base outline-none rounded-lg w-full mt-3 placeholder:text-sm placeholder:text-black"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className={`h-[0%] bg-white `}>
          <LocationSearchPanel
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <VehiclePanel
          confirmedRidePanelOpen={confirmedRidePanelOpen}
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
        />
      </div>
      <div
        ref={confirmedRideRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <ConfirmedRide
          setConfirmedRidePanelOpen={setConfirmedRidePanelOpen}
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
        />
      </div>
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12"
      >
        <LookingForDriver
          vehicleFoundPanelOpen={vehicleFoundPanelOpen}
          setVehicleFoundPanelOpen={setVehicleFoundPanelOpen}
        />
      </div>
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12"
      >
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};
export default Home;
