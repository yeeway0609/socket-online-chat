const express = require('express');
const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(4000, () => {
  console.log('Server Started. Listening http://localhost:4000');
});

let onlineCount = 0;

io.on('connection', (socket) => {
  onlineCount++;
  console.log('a user connected.', onlineCount, 'online');

  socket.on('disconnect', () => {
    onlineCount = (onlineCount < 0) ? 0 : onlineCount -= 1;
    console.log('user disconnected', onlineCount, 'online');
  });

  socket.on('message' , (msg) => {
    io.emit('message', msg);
  });
});



