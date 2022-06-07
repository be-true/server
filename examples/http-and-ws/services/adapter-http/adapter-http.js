const { SERVICE } = require("../names");
const { streamToJson } = require("../../../../lib/utils/streamToJson");

class AdapterHttpService {
    _app;
    _http;
    static service() {
        return {
            name: SERVICE.adapterHttp,
            deps: [SERVICE.http]
        }
    }

    constructor({ app, http }) {
        this._app = app;
        this._http = http;
    }

    async start() {
        this._http.on('request', async (req, res) => {
            const params = streamToJson(req);
            const command = req.url.slice(1);
            const response = await this._app.handleCommand(command, params);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response.toJSON()));
        });
        return this;
    }

    async stop() {}
}

module.exports = {
    AdapterHttpService
}