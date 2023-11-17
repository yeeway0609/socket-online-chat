const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/public", express.static("public"));

server.listen(port, () => {
  console.log(`Server Started. Listening http://localhost:${port}`);
});

let onlineCount = 0;

io.on("connection", (socket) => {
  onlineCount++;
  console.log(`a user connected. ${onlineCount} online`);

  socket.on("disconnect", () => {
    onlineCount = onlineCount < 0 ? 0 : (onlineCount -= 1);
    console.log(`user disconnected.  ${onlineCount} online`);
  });

  socket.on("myMessage", (msg) => {
    io.emit("allMessage", msg);
  });
});
