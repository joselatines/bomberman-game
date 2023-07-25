import 'http://localhost:3000/js/lib/socket.io.min.js';

const socket = io('http://localhost:3000');
let socketID = '';

console.log('PUERTO RICO ME LO CONFIRMO');

socket.on('onConnect', ({id}) => {
  console.log(id);
  socketID = id;
  socket.emit('onConnectServer', {id, ServerName : 'Sebas'});
})

const name = prompt('What is your name?');

const move = ({x, y}) => {
  // console.log(`${x}, ${y} - ${socketID}`);
  socket.emit('onMove', {x, y, id : socketID, name, ServerName : 'Sebas'});
};

socket.on('onMovePlayer', (body) => {
  console.log();
  console.info(body);
})

export {move};
