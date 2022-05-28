const { app } = require("./app");

(async () => {
    await app.start();
})()

// const { WebSocketServer } = require('ws');
// const wss = new WebSocketServer({ server });
// wss.on('connection', function connection(ws) {
//     ws.on('message', function message(data) {
//         console.log('received: %s', data);
//     });

//     ws.send('something');
// });

// setInterval(() => {
//     console.log(wss.clients.size);
// }, 3000)