import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import axios from "axios";

const ConfirmRidePopUp = ({
  ride,
  confirmridePopUpPanel,
  setConfirmRidePopUpPanel,
}) => {
  const [otp, setOtp] = useState(null);

  const navgigate = useNavigate();


  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      setConfirmRidePopUpPanel(false);
      navgigate("/captain-riding", { state: { ride: ride } });
    }
  };

  return (
    <div className="w-full">
      <div className="absolute top-11 right-6 text-2xl " onClick={() => {}}>
        <i
          className={`ri-arrow-down-wide-line text-gray-300
        `}
        ></i>
      </div>

      <h3 className="text-2xl font-semibold mb-5">
        Confirm this ride to start
      </h3>

      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg  mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{ride?.distance} Km</h5>
      </div>
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {" "}
                {ride?.pickup.split(",")[0]}
              </h3>
              <p className="text-sm text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {ride?.destination.split(",")[0]}
              </h3>
              <p className="text-sm text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">&#8377; {ride?.fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-5 ">
        <form className="" onSubmit={(e) => submitHandler(e)}>
          <div className="flex flex-col justify-between items-center px-5 mb-5 ">
            <h4 className="text-xl font-medium font-mono mb-4">
              Enter the OTP
            </h4>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              inputStyle={
                "text-2xl font-semibold text-gray-600 outline-none border-1 border-gray-300 mx-2"
              }
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <button className="w-full flex justify-center items-center bg-green-600 text-lg  text-white font-semibold p-3 rounded-lg my-3">
            Confirm
          </button>
          <button
            onClick={() => {
              setConfirmRidePopUpPanel(false);
            }}
            className="w-full text-lg bg-red-700  text-white font-semibold p-3 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
