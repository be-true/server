const { SERVICE } = require("../names");

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
            // Parse body from stream
            let buffers = [];
            for await (let chunk of req) buffers.push(chunk);
            const body = Buffer.concat(buffers).toString();
            const params = JSON.parse(body);

            const command = req.url.slice(1);
            const result = await this._app.handleCommand(command, params);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });
        return this;
    }

    async stop() {}
}

module.exports = {
    AdapterHttpService
}