"use strict";

var http = require("http");

var url = require('url');

var fs = require('fs');

var io = require('socket.io');

var server = http.createServer(function (request, response) {
  console.log('Connection');
  var path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write('I don\'t need to reload~');
      response.end();
      d;
      break;

    case '/socket.html':
      fs.readFile(__dirname + path, function (error, data) {
        if (error) {
          response.writeHead(404);
          response.write("opps this doesn't exist - 404");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/html"
          });
          response.write(data, "utf8");
        }

        response.end();
      });
      break;

    default:
      response.writeHead(404);
      response.write("opps this doesn't exist - 404");
      response.end();
      break;
  }
});
server.listen(8080);
var serv_io = io.listen(server);
serv_io.sockets.on('connection', function (socket) {
  setInterval(function () {
    socket.emit('randomNum', {
      'message': Math.random() * 100
    });
  }, 1000);
});