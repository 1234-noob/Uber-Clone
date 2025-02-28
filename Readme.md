# Project Overview

This is an Uber-like ride-hailing application split into two major parts: a Node.js-powered backend and a React (Vite) frontend. The solution is designed to manage ride requests, real-time tracking, and both user and driver (captain) interactions.

## Backend

### Structure

The backend is organized into folders covering controllers, models, routes, services, middlewares, and database connections.

### API & Authentication

Endpoints for user and captain registration, login, profile management, and ride management are defined in controllers like `user-controller.js` and `ride-controller.js`.

### Real-Time Updates

Socket.IO is used for real-time communications (see `socket.js`) to notify clients about ride events (e.g., new rides, ride confirmations).

## Frontend

### Structure

Built with React and styled using Tailwind CSS, the frontend is based in the `Frontend/` folder.

### Key Components

Components such as `WaitingForDriver.jsx`, `FinishRide.jsx`, and others manage different states of the ride (searching, waiting, in-progress, completion).

### Routing & State

Routing is handled with React Router, while global state and real-time updates are managed using React Context and Socket.IO integration (see `SocketContext.jsx`).

## Documentation

- Detailed API information and usage examples are provided in `Backend/README.md`.
- Frontend specifics, including setup and component structure, are described in `Frontend/README.md`.
