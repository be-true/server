'use_strict'

const { WebSocketServer } = require('ws');

class AdapterWSService {
    static service() {
        return {
            name: "wsAdapter",
            deps: ["http", "logger"],
            scope: 'singleton',
        }
    }
    
    constructor({ app, http, logger }) {
        this._app = app;
        this._http = http;
        this._logger = logger;
    }

    async start() {
        const wss = new WebSocketServer({ server: this._http });
        wss.on('connection', async (ws) => {
            ws.on('message', async (buffer) => {
                const data = JSON.parse(buffer.toString())
                const { command, params, headers = {} } = data;
                const response = await this._app.handleCommand(command, params, headers);
                ws.send(JSON.stringify(response.toJSON()));
            });
        });

        return this;
    }

    async stop() {}
}

module.exports = {
    AdapterWSService
}