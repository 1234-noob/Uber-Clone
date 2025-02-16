import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newCaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email,
      password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptainData
    );

    if (response.status === 201) {
      const data = response.data;

      localStorage.setItem("token", data.token);
      setCaptainData(data.user);
      navigate("/captain-home");
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setCapacity("");
    setColor("");
    setVehicleType("Select Vehicle type");
    setPlate("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://pngimg.com/uploads/uber/uber_PNG24.png"
          alt=""
          className="w-fit mb-8 h-16 cursor-pointer"
        />
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-base font-medium mb-2">
            What's our Captain's name{" "}
          </h3>
          <div className="flex justify-between space-x-1.5 mb-4">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 outline-none border-gray-400 rounded py-2 px-4 border text-base placeholder:text-sm"
              type="text"
              required
              placeholder="First Name"
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 outline-none  border-gray-400 rounded py-2 px-4 border  text-base placeholder:text-base"
              type="text"
              required
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">
            What's our Captain's email
          </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] outline-none mb-4 border-gray-400 rounded py-2 px-4 border w-full text-base placeholder:text-sm"
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] outline-none  mb-4 border-gray-400 rounded py-2 px-4 border w-full text-base placeholder:text-sm"
            type="password"
            required
            placeholder="password"
          />
          <h3 className="text-base flex flex-col font-medium mb-2">
            Vehicle Information
          </h3>
          <div className="flex justify-between space-x-1.5 mb-4">
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-[#eeeeee] w-1/2 outline-none border-gray-400 rounded py-2 px-4 border text-base placeholder:text-sm"
              type="text"
              required
              placeholder="Vehicle Color"
            />
            <input
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              className="bg-[#eeeeee] w-1/2 outline-none  border-gray-400 rounded py-2 px-4 border  text-base placeholder:text-sm"
              type="text"
              required
              placeholder="Vehicle Plate"
            />
          </div>
          <div className="flex justify-between space-x-1.5 mb-4">
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="bg-[#eeeeee] w-1/2 outline-none  border-gray-400  rounded px-4 py-2 border text-base "
            >
              <option className="bg-[#eeeeee]   border text-sm" value="">
                Select Vehicle Type
              </option>
              <option className="bg-[#eeeeee]   border text-sm" value="car">
                Car
              </option>
              <option className="bg-[#eeeeee]   border text-sm" value="auto">
                Auto
              </option>
              <option className="bg-[#eeeeee]   border text-sm" value="moto">
                Motocycle
              </option>
            </select>
            <input
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="bg-[#eeeeee] w-1/2 outline-none  border-gray-400 rounded py-2 px-4 border  text-base placeholder:text-sm"
              type="number"
              required
              placeholder="Vehicle capacity"
            />
          </div>

          <button className="bg-[#111] font-semibold text-[#fff] mb-3 mt-3 border-gray-400 rounded py-2 px-4 w-full text-lg">
            Create Captain Account
          </button>
        </form>
        <p className="text-center ">
          Already have a account?
          <Link className="text-blue-600" to={"/captain-login"}>
            Login Here
          </Link>
        </p>
      </div>
      <div className="pt-14 pb-7 ">
        <p className="text-[0.65rem] leading-tight ">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy </span> and{" "}
          <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
