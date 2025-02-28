import { useState, useRef } from "react";
import { useLocation } from "react-router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";
const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      transform: finishRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [finishRidePanel]);
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

      <div className="h-4/5">
        <LiveTracking />
      </div>
      <div
        className="h-1/5 p-6 relative items-center justify-between flex bg-yellow-400 "
        onClick={() => setFinishRidePanel(true)}
      >
        <div
          className="absolute top-0 flex justify-center items-center  text-2xl w-[80%] p-2 "
          onClick={() => {
            () => setFinishRidePanel(false);
          }}
        >
          <i class="ri-arrow-up-wide-line text-gray-400"></i>
        </div>
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button className="  bg-green-600  text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide
          rideData={rideData}
          setFinishRidePanel={setFinishRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
