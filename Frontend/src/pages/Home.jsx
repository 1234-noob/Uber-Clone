import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    setPickup("");
    setDrop("");
  };

  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? "70%" : "0%",
      padding: panelOpen ? "24" : "0",
      display: panelOpen ? "block" : "none",
    });
  }, [panelOpen]);
  return (
    <div className="h-screen relative">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
        className="w-16 absolute mt-9 ml-9 cursor-pointer"
      />
      <div className="h-screen w-full">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen w-full absolute top-0 ">
        <div className="h-[30%] p-6 bg-white relative ">
          <h5
            onClick={() => setPanelOpen(!panelOpen)}
            className="absolute top-6 right-6 text-2xl"
          >
            {" "}
            <i
              class={`ri-arrow-up-wide-line ${
                panelOpen ? "hidden" : "visible"
              }`}
            ></i>
            <i
              className={`ri-arrow-down-wide-line ${
                panelOpen ? "visible" : "hidden"
              }`}
            ></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={(e) => onSubmitHandler(e)}>
            <div className="absolute h-16 w-1 bg-gray-700 top-[45%] left-10 rounded-full "></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eeeeee] px-12 py-2 text-base outline-none rounded-lg w-full mt-5 placeholder:text-sm placeholder:text-black"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="bg-[#eeeeee] px-12 py-2 text-base outline-none rounded-lg w-full mt-3 placeholder:text-sm placeholder:text-black"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className={`h-[0%] bg-white `}>
          <LocationSearchPanel />
        </div>
      </div>
      <div className="fixed w-full z-10 bottom-0 bg-white p-3">
        <h3 className="text-2xl font-semibold mb-5">Choose a vehicle</h3>

        <div className="flex px-3 mb-2 py-6 active:border-2 border-black bg-gray-100 rounded-xl w-full  items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398971/assets/29/fbb8b0-75b1-4e2a-8533-3a364e7042fa/original/UberSelect-White.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base ">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill p-0.5"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">&#8377;193.20</h2>
        </div>
        <div className="flex px-3 mb-2 py-6 active:border-2 border-black bg-gray-100 rounded-xl w-full  items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base ">
              UberAuto{" "}
              <span>
                <i className="ri-user-3-fill p-0.5"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-sm">5 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, Auto rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">&#8377;150.74</h2>
        </div>
        <div className="flex px-3 mb-2 py-6 active:border-2 border-black bg-gray-100 rounded-xl w-full  items-center justify-between">
          <img
            className="h-12"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className=" w-1/2">
            <h4 className="font-medium text-base ">
              Moto{" "}
              <span>
                <i className="ri-user-3-fill p-0.5"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">3 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, motocycle rides
            </p>
          </div>
          <h2 className="text-lg font-semibold">&#8377;65.74</h2>
        </div>
      </div>
    </div>
  );
};
export default Home;
