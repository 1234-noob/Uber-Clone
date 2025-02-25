require("dotenv").config();
const http = require("http");
const app = require("./app");
const connectToDB = require("./database/db");
const server = http.createServer(app);
const { intializeSocket } = require("./socket");
const port = process.env.PORT || 3000;

intializeSocket(server);
connectToDB();
server.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
