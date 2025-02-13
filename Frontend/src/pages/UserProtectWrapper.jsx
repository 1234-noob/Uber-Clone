import { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
const UserProtectWrapper = ({ children }) => {
  const { userData } = useContext(UserDataContext);
  const navigate = useNavigate();
  return <div>UserProtectWrapper</div>;
};

export default UserProtectWrapper;
