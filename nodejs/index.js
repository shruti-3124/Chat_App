// node server handles socket io conn

const io= require('socket.io')(80);
const users={};
io.on('connection',socket=>{ // instance of socket.io  listens to all events
  socket.on('new-user',name=>{  // handles a particular connection 
      users[socket.id]=name;        //if new user event comes then socket.id indx becomes name 
      socket.broadcast.emit('new-user-joined',name);                                                     //emits to all that new user joined leaving the person who has joined;

  });

socket.on('chat-sent',message=>{
socket.broadcast.emit('received',{name:users[socket.id],message:message})
  });

socket.on('disconnect',message=>{
socket.broadcast.emit('left',users[socket.id]);
delete users[socket.id];
})

})