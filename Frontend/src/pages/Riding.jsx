import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketDataContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const { socket } = useContext(SocketDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const rideData = location.state?.ride;
  useEffect(() => {
    socket.on("ride-ended", (data) => {
      navigate("/home");
    });
  }, []);
  return (
    <div className="h-screen">
      <Link
        to={"/home"}
        className="fixed top-2 right-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-3-line"></i>
      </Link>

      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 px-4">
        <div className="flex py-2 items-center justify-between">
          <img
            className="h-10"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium">
              {rideData?.captain.fullname.firstname +
                " " +
                rideData?.captain.fullname.lastname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {rideData?.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">
              {" "}
              {rideData?.captain.vehicle.model}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-between items-center">
          <div className="w-full mt-5 ">
            <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">
                  {" "}
                  {rideData?.destination.split(",")[0]}
                </h3>
                <p className="text-sm text-gray-600">
                  {" "}
                  {rideData?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
              <i className="text-lg ri-currency-fill"></i>
              <div>
                <h3 className="text-lg font-medium">
                  &#8377; {rideData?.fare}
                </h3>
                <p className="text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full bg-green-600 mt-5 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
