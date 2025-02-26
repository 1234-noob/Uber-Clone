const sockekIo = require("socket.io");
const user = require("./models/user");
const captain = require("./models/captain");
let io;

const intializeSocket = (server) => {
  io = sockekIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected ${socket.id} `);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);
      if (userType === "user") {
        const userData = await user.findById(userId);
        userData.socketId = socket.id;
        await userData.save();
      } else if (userType === "captain") {
        const captainData = await captain.findById(userId);
        captainData.socketId = socket.id;
        await captainData.save();
      }
    });
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Location is required" });
      }
      await captain.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected ${socket.id}`);
    });
  });
};

const sendMessageToSocketId = (socketId, message) => {
  console.log(
    `Sending message to ${socketId} & event ${message.event} ${message.data}`
  );
  if (io) {
    io.to(socketId).emit(message.event, message.data);
  } else {
    console.log("Socket.io not initialized");
  }
};

module.exports = { intializeSocket, sendMessageToSocketId };
