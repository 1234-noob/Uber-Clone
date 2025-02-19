const LocationSearchPanel = ({ vehiclePanelOpen, setVehiclePanelOpen }) => {
  const locations = [
    "24B, Near Kapoor's Cafe , Gaming Cafe Mumbai",
    "Grant Road, Mumbai",
    "Mumbai Central, Mumbai",
    "Indira Gandhi International Airport, Delhi",
    "Chhatrapati Shivaji Maharaj Terminus, Mumbai",
    "Garden City, Mumbai",
  ];
  return (
    <div className="py-2">
      {locations.map((location, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              setVehiclePanelOpen(!vehiclePanelOpen);
            }}
            className="flex active:border-black border-2 border-gray-50 p-3 rounded-2xl gap-4 items-center justify-start my-4"
          >
            <div className="">
              <i className="ri-map-pin-fill  rounded-full w-10 h-10 flex justify-center items-center bg-[#eeeeee]"></i>
            </div>

            <h4 className="font-medium">{location}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
