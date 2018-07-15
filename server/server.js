const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server); //communicate b/w server and client

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log("New user connected");

  socket.on('disconnect', ()=>{
    console.log("disconnect to the server");
  });
  
}); //register an new event listener connection is new event it listen new connection
server.listen(port, ()=>{
  console.log(`server is up on the port ${port}`);
});
