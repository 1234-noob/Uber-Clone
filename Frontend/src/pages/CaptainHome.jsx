import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
  const [confirmridePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ridePopUpPanel, setRidePopPanel] = useState(true);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

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
          <i class="font-medium text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
        <CaptainDetails />
      </div>
      <div
        ref={ridePopUpPanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <RidePopUp
          setRidePopPanel={setRidePopPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
      <div
        ref={confirmRidePopUpPanelRef}
        className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <ConfirmRidePopUp
          confirmridePopUpPanel={confirmridePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
