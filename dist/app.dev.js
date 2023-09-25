"use strict";

var app = require('http').createServer();

var io = require('socket.io')(app);

var port = 8080;
app.listen(port);
console.log('app listen at' + port);