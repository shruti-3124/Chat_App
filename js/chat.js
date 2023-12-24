// our client side server
const socket=io('http://localhost:80',{transports:["websocket"]});

const form=document.getElementById('sendarea');
const messageinp=document.getElementById('input-area');
const messagecont=document.querySelector('.container');
var audio = new Audio('ding.mp3');

const append=(message,position)=>{
const messageele=document.createElement('div');
messageele.innerText = message;
messageele.classList.add('message');
messageele.classList.add(position);
messagecont.append(messageele);
if(position =='left'){
  audio.play();
}
}
form.addEventListener('submit',(e)=>{
  e.preventDefault(); // prevents page reload when form is submitted
  const message= messageinp.value;
  append(`you: ${message}`,'right');
  socket.emit('chat-sent',message);
  messageinp.value="";
})
const name=prompt("enter your name");
socket.emit('new-user',name);
socket.on('new-user-joined',name=>{
  append(`${name} joined the chat`,'right')
})

socket.on('received',data=>{
  append(`${data.message}:${data.name}`,'left')
})

socket.on('left',message=>{
  append(`${message} left the chat`,'left');
})