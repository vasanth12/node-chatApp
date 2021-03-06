const path = require('path');
const http = require('http');
const express = require('express');
var socketIO = require('socket.io');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
  console.log('new user connected');

  socket.emit('newMessage', {
    from:"Admin",
    text:"Welcome to Chat Ap",
    createAt : new Date().getTime()
  });

   socket.broadcast.emit('newMessage',{
     from:"Admin",
     text:"new User Joined",
     createAt:new Date().getTime()
   });

  socket.on('createMessage',(message)=>{
    console.log('client-message' + message);
    io.emit('newMessage',{
      from:message.from,
      text:message.text,
      createAt:new Date().getTime()
    });
  });

  socket.on('disconnect', ()=>{
    console.log('user disconnected from server');
  });
});
server.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});
