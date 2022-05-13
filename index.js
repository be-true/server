'use strict'

const { app } = require("./app");

const http = require("http");
const server = http.createServer(async (req, res) => {
    // Parse body from stream
    let buffers = [];
    for await (let chunk of req) buffers.push(chunk);
    const bodyString = Buffer.concat(buffers).toString();
    const body = JSON.parse(bodyString);

    const router = req.url.slice(1);
    const result = app.handleCommand(router, body);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(result));
});

const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ server });
wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});

setInterval(() => {
    console.log(wss.clients.size);
}, 3000)

const port = 3000;
const host = '127.0.0.1';
server.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`)
});