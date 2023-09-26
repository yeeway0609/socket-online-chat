"use strict";

var express = require('express');

var app = express();

var path = require('path');

var server = require('http').createServer(app);

var _require = require('socket.io'),
    Server = _require.Server;

var io = new Server(server);
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(express["static"](path.join(__dirname, 'public')));
server.listen(4000, function () {
  console.log('Server Started. Listening http://localhost:4000');
});
var onlineCount = 0;
io.on('connection', function (socket) {
  onlineCount++;
  console.log('a user connected.', onlineCount, 'online');
  socket.on('disconnect', function () {
    onlineCount = onlineCount < 0 ? 0 : onlineCount -= 1;
    console.log('user disconnected', onlineCount, 'online');
  });
  socket.on('message', function (msg) {
    io.emit('message', msg);
  });
});