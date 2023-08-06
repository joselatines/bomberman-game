import 'http://localhost:3000/js/lib/socket.io.min.js';
import * as helpers from './helpers/all.js';

const socket = io('http://localhost:3000');
let socketID = '';

const data = JSON.parse(`{${location.search.replace('?', '"').replaceAll('=', '":"').replaceAll('&', '","')}"}`);

const move = ({x, y}) => {
  socket.emit('onMove', {x, y, id : socketID, name: data.name, ServerName : data.ServerName});
};

socket.on('onConnect', ({id}) => {
  console.log(id);
  socketID = id;
  socket.emit('onConnectServer', {id, ServerName: data.ServerName, name: data.name});
});

socket.on('onJoinPlayer', (body) => {
  console.log('join');
  // online.player1.position.x = 1106;
  // online.player1.position.y = 711;
});

socket.on('onPlayer', (body) => {
  body.forEach((e) => {
    const getInfo = e[0].split('.');

    if(getInfo.at(-1) === 'position') helpers.position(e, parseInt(getInfo[1]));
  })


  // online[`player${id}`]
/*
[
    {
        "name": "Sebas",
        "position": {
            "x": "139.92",
            "y": "58.00"
        },
        "bomba": {
            "power": "",
            "position": {
                "x": "0",
                "y": "0"
            },
            "time": "2023-08-06T03:47:45.242Z"
        }
    }
]
*/
});


export {move};
