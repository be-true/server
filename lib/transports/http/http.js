'use_strict'

const http = require("http");

const port = 3000;
const host = '127.0.0.1';

class HttpService {
    _logger;
    _server
    static service() {
        return {
            name: "http",
            deps: ["logger"]
        }
    }

    constructor({ logger }) {
        this.host = host;
        this.port = port;
        this._logger = logger;
    }

    async start() {
        this._server = http.createServer();
        const startHttp = new Promise((res, rej) => {
            this._server.listen(port, host, () => {
                this._logger.log(`Server started on ${host}:${port}`)
                res();
            });
        });
        await startHttp;
        return this._server;
    }

    async stop() {}
}

module.exports = {
    HttpService
}