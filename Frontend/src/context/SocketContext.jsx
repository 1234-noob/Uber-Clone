import { createContext, useEffect } from "react";
import io from "socket.io-client";

export const SocketDataContext = createContext();
const socket = io(import.meta.env.VITE_BASE_URL);
const SocketContext = ({ children }) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("connect", () => {
      console.log("Connected to server");
    });
  }, []);

  const sendMessage = (eventName, message) => {
    socket.emit(eventName, message);
  };

  const reciveMessage = (eventName, callback) => {
    socket.on(eventName, callback);
  };

  return (
    <SocketDataContext.Provider
      value={{
        socket,
        sendMessage,
        reciveMessage,
      }}
    >
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketContext;
