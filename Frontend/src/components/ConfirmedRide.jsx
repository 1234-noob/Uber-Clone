import "remixicon/fonts/remixicon.css";
const ConfirmedRide = ({
  createRide,
  fare,
  pickup,
  drop,
  vehicleType,
  setConfirmedRidePanelOpen,
  setVehicleFoundPanelOpen,
}) => {
  const getMainAddress = (address) => {
    return address.split(",")[0];
  };
  return (
    <div className="relative w-full">
      <div
        className="absolute top-0 right-6 text-2xl "
        onClick={() => setConfirmedRidePanelOpen(false)}
      >
        <i
          className={`ri-arrow-down-wide-line text-gray-300
            `}
        ></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>
      <div className="flex flex-col gap-5 justify-between items-center">
        {vehicleType === "car" ? (
          <img
            className="h-24"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
        ) : null}
        {vehicleType === "auto" ? (
          <img
            className="h-24"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
        ) : null}
        {vehicleType === "motorcycle" ? (
          <img
            className="h-24"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
        ) : null}
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{getMainAddress(pickup)}</h3>
              <p className="text-sm text-gray-600">{pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{getMainAddress(drop)}</h3>
              <p className="text-sm text-gray-600">{drop}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">&#8377; {fare}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setConfirmedRidePanelOpen(false);
          setVehicleFoundPanelOpen(true);
          createRide();
        }}
        className="w-full bg-green-600 mt-5 text-white font-semibold p-2 rounded-lg"
      >
        Confirm
      </button>
    </div>
  );
};

export default ConfirmedRide;
