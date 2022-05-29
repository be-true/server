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
        wss.on('connection', function connection(ws) {
            ws.on('message', function message(data) {
                logger.log('received: %s', data);
            });

            ws.send('something');
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