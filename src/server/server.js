'use strict';

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT);

let history = [];

io.on('connection', (socket) =>{
  console.log('Client Connected', socket.id)

  socket.on('text', (payload)=>{
    console.log('broadcasting', payload);
    history.push(payload);
    io.sockets.emit('incoming', payload);
  });

  socket.on('history', ()=>{
    io.sockets.emit('history', history);
  });

  socket.on('delete', (payload)=>{
    console.log('new History', payload);
    history = payload;
    io.sockets.emit('history', history);
  })

})