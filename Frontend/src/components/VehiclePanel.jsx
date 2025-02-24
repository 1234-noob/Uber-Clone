const VehiclePanel = ({
  confirmedRidePanelOpen,
  setConfirmedRidePanelOpen,
  setVehiclePanelOpen,
}) => {
  const vehicleDetails = [
    {
      vehilce: "UberGo",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png",
      capacity: "4",
      time: "2 mins ",
      tag: "Affordable, compact rides",
      price: "193.20",
    },
    {
      vehilce: "Auto",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
      capacity: "3",
      time: "5 mins ",
      tag: "Affordable, Auto rides",
      price: "120.20",
    },
    {
      vehilce: "Moto",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      capacity: "1",
      time: "3 mins ",
      tag: "Affordable, Motocycle rides",
      price: "65.74",
    },
  ];
  return (
    <div>
      <div
        className="absolute top-12 right-6 text-2xl "
        onClick={() => setVehiclePanelOpen(false)}
      >
        <i
          className={`ri-arrow-down-wide-line text-gray-300
        `}
        ></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>
      {vehicleDetails.map((vehicle, index) => {
        return (
          <div
            onClick={() => setConfirmedRidePanelOpen(!confirmedRidePanelOpen)}
            key={index}
            className="flex px-3 mb-2 py-6 active:border-2 border-black bg-gray-100 rounded-xl w-full  items-center justify-between"
          >
            <img className="h-12" src={vehicle.img} alt="" />
            <div className=" w-1/2">
              <h4 className="font-medium text-base ">
                {vehicle.vehilce}
                <span>
                  <i className="ri-user-3-fill p-0.5"></i>
                  {vehicle.capacity}
                </span>
              </h4>
              <h5 className="font-medium text-sm">{vehicle.time} mins away</h5>
              <p className="font-normal text-xs text-gray-600">{vehicle.tag}</p>
            </div>
            <h2 className="text-lg font-semibold">&#8377;{vehicle.price}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default VehiclePanel;
