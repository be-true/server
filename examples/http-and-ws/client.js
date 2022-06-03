'use_strict'
const WebSocket = require('ws');

const ws = new WebSocket('ws://127.0.0.1:3000');

ws.on('open', function open() {
  ws.send(JSON.stringify({ command: 'test', params: {
    name: "Eugen",
  }}));
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});