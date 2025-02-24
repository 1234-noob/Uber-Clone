const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDrop,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDrop(suggestion.description);
    }
  };
  return (
    <div className="py-2">
      {suggestions.map((suggestion, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              handleSuggestionClick(suggestion);
            }}
            className="flex active:border-black border-2 border-gray-50 p-3 rounded-2xl gap-4 items-center justify-start my-4"
          >
            <div className="">
              <i className="ri-map-pin-fill  rounded-full w-10 h-10 flex justify-center items-center bg-[#eeeeee]"></i>
            </div>

            <h4 className="font-medium">{suggestion.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
