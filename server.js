const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { Socket } = require('dgram');

const app = express();

//using server to listen port
const server = http.createServer(app);
const io = socketio(server);
//Set static folder

app.use(express.static(path.join(__dirname, 'public')));

//run when client connects

io.on('connection', (socket) => {
  //Welcome current user
  socket.emit('message', 'Welcome to PingApp');

  //Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined chat');

  //Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg);
  });
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
