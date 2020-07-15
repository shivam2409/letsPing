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
  console.log('New connection..');
});

const PORT = 3001 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
