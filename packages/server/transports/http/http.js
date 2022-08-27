'use_strict'

const http = require("http");

class HttpService {
    _logger;
    _server
    static service() {
        return {
            name: "http",
            deps: ["logger"],
            scope: 'singleton',
            config: { 
                host: '127.0.0.1',
                port: 3000,
            }
        }
    }

    constructor({ logger }, config) {
        this._logger = logger;
        this._config = config;
    }

    async start() {
        const { host, port } = this._config;
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