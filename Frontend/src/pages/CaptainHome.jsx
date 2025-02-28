import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef, useState, useEffect, useContext, use } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [confirmridePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ridePopUpPanel, setRidePopPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const { sendMessage, reciveMessage, socket } = useContext(SocketDataContext);
  const { captainData } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);
  useEffect(() => {
    sendMessage("join", {
      userType: "captain",
      userId: captainData._id,
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = {
            ltd: position.coords.latitude,
            lng: position.coords.longitude,
          };
          sendMessage("update-location-captain", {
            userId: captainData._id,
            location,
          });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  socket.on("newride", (data) => {
   
    setRide(data);
    setRidePopPanel(true);
  });
  useGSAP(() => {
    gsap.to(ridePopUpPanelRef.current, {
      transform: ridePopUpPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [ridePopUpPanel]);
  useGSAP(() => {
    gsap.to(confirmRidePopUpPanelRef.current, {
      transform: confirmridePopUpPanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmridePopUpPanel]);

  const confirmRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,

      {
        rideId: ride._id,
        captainId: captainData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };
  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex justify-between items-center w-full">
        <img
          className="w-16 "
          src="https://pngimg.com/uploads/uber/uber_PNG24.png"
          alt=""
        />
        <Link
          to={"/captain-logout"}
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="font-medium text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          ride={ride}
          setRidePopPanel={setRidePopPanel}
          confirmRide={confirmRide}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          ride={ride}
          confirmridePopUpPanel={confirmridePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
