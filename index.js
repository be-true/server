'use strict'
const http = require("http");

const controllers = {
    "auth": require("./controllers/auth"),
    "test": require("./controllers/test"),
}

const server = http.createServer(async (req, res) => {
    const router = req.url.slice(1);
    const controller = controllers[router];
    if (!controller) return res.end();

    // Parse body from stream
    let buffers = [];
    for await (let chunk of req) buffers.push(chunk);
    const bodyString = Buffer.concat(buffers).toString();
    const body = JSON.parse(bodyString);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(controller(body)));
});

const port = 3000;
const host = '127.0.0.1';
server.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`)
});