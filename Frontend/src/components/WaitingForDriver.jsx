const WaitingForDriver = ({ setWaitingForDriver, ride }) => {
  const getMainAddress = (address) => {
    if (!address) {
      return "";
    } else {
      return address.split(",")[0];
    }
  };
  return (
    <div className="relative w-full">
      <div
        className=" flex items-center justify-center w-full text-2xl "
        onClick={() => {
          setWaitingForDriver(false);
        }}
      >
        <i
          className={`ri-arrow-down-wide-line text-gray-300
            `}
        ></i>
      </div>
      <div className="flex mt-5 items-center justify-between">
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-base font-medium capitalize">
            {ride?.captain?.fullname.firstname +
              " " +
              ride?.captain?.fullname.lastname}
          </h2>
          <h4 className="text-lg font-semibold -mt-1 -mb-1">
            {ride?.captain?.vehicle.plate}
          </h4>
          <p className="text-sm text-gray-600">
            {ride?.captain?.vehicle.model}
          </p>
          <h1 className="text-sm font-semibold">Otp-{ride?.otp}</h1>
        </div>
      </div>
      <div className="flex flex-col gap-5 justify-between items-center">
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {getMainAddress(ride?.pickup)}
              </h3>
              <p className="text-sm text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {getMainAddress(ride?.destination)}
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
    </div>
  );
};

export default WaitingForDriver;
