'use_strict'

const { streamToJson } = require("../../utils");

class AdapterHttpService {
    static service() {
        return {
            name: "httpAdapter",
            deps: ["http"],
            scope: 'singleton',
        }
    }

    constructor({ app, http }) {
        this._app = app;
        this._http = http;
    }

    async start() {
        this._http.on('request', async (req, res) => {
            const params = await streamToJson(req);
            const headers = req.headers ?? {};
            const command = req.url.slice(1);
            const response = await this._app.handleCommand(command, params, headers);
            res.writeHead(response.code, { 'Content-Type': 'application/json' });
            response.toStream().pipe(res);
        });
        return this;
    }

    async stop() {}
}

module.exports = {
    AdapterHttpService
}