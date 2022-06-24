'use_strict'

const http = require("http");
const { HttpService } = require("../../../../lib");

const port = 3001;
const host = '127.0.0.1';

class HttpService2 extends HttpService {
    constructor(di) {
        super(di);
        this.host = host;
        this.port = port;
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
    HttpService2
}