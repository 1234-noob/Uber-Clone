import { useState } from "react";
import { Link } from "react-router-dom";
const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
          className="w-20 mb-12 cursor-pointer"
        />
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <h3 className="text-base font-medium mb-2">What's your name </h3>
          <div className="flex justify-between space-x-1.5 mb-6">
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
          <h3 className="text-base font-medium mb-2">What's your email </h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] outline-none mb-6 border-gray-400 rounded py-2 px-4 border w-full text-base placeholder:text-sm"
            type="email"
            required
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] outline-none  mb-6 border-gray-400 rounded py-2 px-4 border w-full text-base placeholder:text-sm"
            type="password"
            required
            placeholder="password"
          />
          <button className="bg-[#111] font-semibold text-[#fff] mb-3 border-gray-400 rounded py-2 px-4 w-full text-lg">
            Login
          </button>
        </form>
        <p className="text-center ">
          Already have a account?
          <Link className="text-blue-600" to={"/login"}>
            Login Here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[0.65rem] leading-tight ">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy </span> and{" "}
          <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
