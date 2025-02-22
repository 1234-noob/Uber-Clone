import React from "react";

const LookingForDriver = ({
  vehicleFoundPanelOpen,
  setVehicleFoundPanelOpen,
}) => {
  return (
    <div className="relative w-full">
      <div
        className="absolute top-0 right-6 text-2xl "
        onClick={() => setVehicleFoundPanelOpen(!vehicleFoundPanelOpen)}
      >
        <i
          className={`ri-arrow-down-wide-line text-gray-300
            `}
        ></i>
      </div>
      <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>

      <div className="flex flex-col gap-5 justify-between items-center">
        <img
          className="h-24"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">Grant Road,Mumbai</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm text-gray-600">Grant Road,Mumbai</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">&#8377; 193.50</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
