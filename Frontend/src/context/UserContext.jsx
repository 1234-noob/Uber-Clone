import { createContext, useState } from "react";

export const UserDataContext = createContext();
const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });
  return (
    <div>
      <UserDataContext.Provider
        value={{
          userData,
          setUserData,
        }}
      >
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default UserContext;
