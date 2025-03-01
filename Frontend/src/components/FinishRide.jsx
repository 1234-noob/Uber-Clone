import axios from "axios";

import { useNavigate } from "react-router-dom";
const FinishRide = ({ setFinishRidePanel, rideData }) => {
  const navigate = useNavigate();
  const endRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,

      {
        rideId: rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate("/captain-home");
    }
  };

  return (
    <>
      <div
        className="absolute top-11 right-6 text-2xl "
        onClick={() => setFinishRidePanel(false)}
      >
        <i
          className={`ri-arrow-down-wide-line text-gray-300
    `}
        ></i>
      </div>

      <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>

      <div className="flex items-center justify-between p-4 border-yellow-400 border-2 rounded-lg  mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {rideData?.user.fullname.firstname +
              " " +
              rideData?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{rideData?.distance} Km</h5>
      </div>
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {rideData?.pickup.split(",")[0]}
              </h3>
              <p className="text-sm text-gray-600"> {rideData?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {" "}
                {rideData?.destination.split(",")[0]}
              </h3>
              <p className="text-sm text-gray-600"> {rideData?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">&#8377; {rideData?.fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-5 ">
        <button
          onClick={endRide}
          className="w-full flex justify-center items-center text-lg bg-green-600  text-white font-semibold p-3 rounded-lg my-3"
        >
          Finish
        </button>
        <p className="text-red-500 bottom-2 absolute text-xs text-center">
          click on finish ride buttom if you have completed the payment.
        </p>
      </div>
    </>
  );
};

export default FinishRide;
