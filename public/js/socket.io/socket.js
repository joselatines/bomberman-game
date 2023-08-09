import 'http://localhost:3000/js/lib/socket.io.min.js';
import * as helpers from './helpers/all.js';

const socket = io('http://localhost:3000');
let socketID = '';

const data = JSON.parse(`{${location.search.replace('?', '"').replaceAll('=', '":"').replaceAll('&', '","')}"}`);

const move = ({x, y}) => {
  socket.emit('onMove', {x, y, id : socketID, positionPlayer, name: data.name, ServerName : data.ServerName});
};

socket.on('onConnect', ({id}) => {
  console.log(id);
  socketID = id;
  socket.emit('onConnectServer', {id, ServerName: data.ServerName, name: data.name});
});

socket.on('onJoinPlayer', (body) => {
});

socket.on('onPlayerMove', (body) => {
  helpers.position(body);
});



export {move};
