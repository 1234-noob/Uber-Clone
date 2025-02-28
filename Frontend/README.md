# Frontend Overview

This project uses React with Vite for a fast development environment and Tailwind CSS for styling. The application mimics a ride-hailing experience similar to Uber.

## Key Components & Pages

### Components

- **WaitingForDriver.jsx**  
  Displays information while the user is waiting for a driver. It shows details like the captain’s name, vehicle details, OTP, and ride locations.

- **LiveTracking.jsx**  
  Integrates Google Maps to show the current location of the driver or the user.

- **LocationSearchPanel.jsx**  
  Provides real-time location suggestions for pick-up and destination fields.

- **ConfirmRidePopUp.jsx & RidePopUp.jsx**  
  Pop-up modals that allow users to confirm a ride request and view ride details.

### Pages

- **Home.jsx**  
  The main landing page for authenticated users where the ride search, selection, and waiting state are managed.

- **Riding.jsx**  
  Displays the live tracking information and ride details during an ongoing ride.

- **Captain Pages (CaptainHome.jsx, CaptainLogin.jsx, etc.)**  
  Manage the flow for drivers (captains) including authentication, live ride requests, and ride management.

## Libraries and Dependencies

Below is a list of key libraries used in the Frontend along with their corresponding npm packages and purposes:

- **React**

  - **npm:** [react](https://www.npmjs.com/package/react)
  - **Usage:** The core library for building user interfaces.

- **React DOM**

  - **npm:** [react-dom](https://www.npmjs.com/package/react-dom)
  - **Usage:** Provides DOM-specific methods for React; used to render components in the browser.

- **React Router DOM**

  - **npm:** [react-router-dom](https://www.npmjs.com/package/react-router-dom)
  - **Usage:** Implements routing in the application, allowing navigation between components and pages.

- **Socket.IO Client**

  - **npm:** [socket.io-client](https://www.npmjs.com/package/socket.io-client)
  - **Usage:** Enables real-time, bidirectional communication between the client and the server.

- **Tailwind CSS**

  - **npm:** [tailwindcss](https://www.npmjs.com/package/tailwindcss)
  - **Usage:** A utility-first CSS framework used for rapidly building custom designs directly in the markup.

- **Vite**

  - **npm:** [vite](https://www.npmjs.com/package/vite)
  - **Usage:** A fast and modern bundler and development server for building and serving the application.

- **Google Maps JavaScript API**
  - **Usage:** Integrated in components such as LiveTracking.jsx to display maps and markers.

## Routing

Routing is managed using React Router. The application declares routes in `App.jsx` where pages are wrapped with protection components such as `UserProtectWrapper` and `CaptainProtectWrapper` to ensure that only authenticated users or captains can access certain routes.

## Context & Socket Integration

### Context API

The project uses React’s Context API to manage user and captain data across the application. Contexts can be found in `UserContext.jsx`, `CaptainContext.jsx`, and `SocketContext.jsx`.

### Real-Time Updates

The `SocketContext.jsx` provides a global socket connection using Socket.IO. It listens for events like `"ride-confirmed"` or `"ride-started"` and updates the UI accordingly.

## Running the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   ```bash
   Open http://localhost:5173 to view the application.
   ```
