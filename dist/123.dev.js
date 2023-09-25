"use strict";

var express = require('express');

var app = express();

var path = require('path'); // 載入 html 檔


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
}); // 用來處理放在 public 的檔案，像是 css 檔

app.use(express["static"](path.join(__dirname, 'public')));
var server = app.listen(5050, function () {
  console.log('Node server is running..');
});