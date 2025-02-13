import { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://pngimg.com/uploads/uber/uber_PNG24.png"
          alt=""
          className="w-fit mb-10 h-16 cursor-pointer"
        />
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email </h3>
          <input
            className="bg-[#eeeeee] outline-none mb-7 border-gray-400 rounded py-2 px-4 border w-full text-lg placeholder:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] outline-none  mb-7 border-gray-400 rounded py-2 px-4 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] font-semibold text-[#fff] mb-3 border-gray-400 rounded py-2 px-4 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center ">
          Join a fleet?
          <Link className="text-blue-600" to={"/captain-signup"}>
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={"/login"}
          className="bg-amber-600 hover:bg-amber-500 flex justify-center mb-5 items-center font-semibold text-[#fff]   rounded py-2 px-4 w-full text-lg"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
