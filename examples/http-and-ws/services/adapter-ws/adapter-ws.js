const { SERVICE } = require("../names");

class AdapterWSService {
    _app;
    _http;
    static service() {
        return {
            name: SERVICE.adapterWS,
            deps: [SERVICE.http, SERVICE.logger]
        }
    }

    constructor({ app, http, logger }) {
        this._app = app;
        this._http = http;
        this._logger = logger;
    }

    async start() {
        const { WebSocketServer } = require('ws');
        const wss = new WebSocketServer({ server: this._http });
        const logger = this._logger;
        wss.on('connection', async (ws) => {
            ws.on('message', async (buffer) => {
                const data = JSON.parse(buffer.toString())
                const { command, params } = data;
                const result = await this._app.handleCommand(command, params);
                ws.send(JSON.stringify(result));
            });
        });

        setInterval(() => {
            logger.log(wss.clients.size);
        }, 3000)
        return this;
    }

    async stop() {}
}

module.exports = {
    AdapterWSService
}