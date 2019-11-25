const apps = require('express')();
const http = require('http').createServer(apps);
const socket = require('socket.io')(http);

apps.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

socket.emit('connection', {
  someProperty: 'some value',
  otherProperty: 'other value'
});

socket.on('connection', function (responseSocket) {
  console.log('a user connected');
  // responseSocket.broadcast.emit("hello everyone!");
  responseSocket.on('disconnect', function () {
    console.log('a user disconnect');
  });

  responseSocket.on('chat message', function (message) {
    console.log('message: ', message);
  });

  responseSocket.on('chat message', function (message) {
    socket.emit("chat message", message);
  });
});

http.listen(3000, function () {
  console.log('listen on https://localhost:3000');
});