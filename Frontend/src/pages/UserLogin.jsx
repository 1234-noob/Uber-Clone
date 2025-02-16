import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const userLoginData = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      userLoginData
    );

    if (response.status === 200) {
      const data = response.data;

      setUserData(data.user);
      localStorage.setItem("token", data.token);

      navigate("/home");
    }

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
          New here?
          <Link className="text-blue-600" to={"/signup"}>
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={"/captain-login"}
          className="bg-[#10b461] hover:bg-green-600 flex justify-center mb-5 items-center font-semibold text-[#fff]   rounded py-2 px-4 w-full text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
