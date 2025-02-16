import { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const { setCaptainData } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }
  }, [token]);

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response === 200) {
        console.log(response);
        setCaptainData(response.data.captain);

        setIsLoading(false);
      }
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });

  if (isLoading) {
    return <h3>Loading....</h3>;
  }
  return <>{children}</>;
};

export default CaptainProtectWrapper;
