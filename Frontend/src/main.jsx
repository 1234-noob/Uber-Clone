import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContext from "./context/UserContext";
import CaptainContext from "./context/CaptainContext.jsx";
import { BrowserRouter } from "react-router-dom";
import SocketContext from "./context/SocketContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketContext>
      <CaptainContext>
        <UserContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContext>
      </CaptainContext>
    </SocketContext>
  </StrictMode>
);
