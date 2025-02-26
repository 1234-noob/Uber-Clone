const RidePopUp = ({
  confirmRide,
  ride,
  setRidePopPanel,
  setConfirmRidePopUpPanel,
}) => {
  return (
    <div className="">
      <div
        className="absolute top-11 right-6 text-2xl "
        onClick={() => {
          setRidePopPanel(false);
        }}
      >
        <i
          className={`ri-arrow-down-wide-line text-gray-300
            `}
        ></i>
      </div>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg  mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
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
      <div className="flex gap-4 justify-between items-center mt-5">
        <button
          onClick={() => {
            setConfirmRidePopUpPanel(true);
            setRidePopPanel(false);
            confirmRide();
          }}
          className="w-full bg-green-600  text-white font-semibold p-3 rounded-lg"
        >
          Accept
        </button>
        <button
          onClick={() => setRidePopPanel(false)}
          className="w-full bg-red-700  text-white font-semibold p-3 rounded-lg"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
