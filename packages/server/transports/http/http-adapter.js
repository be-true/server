'use_strict'

const { streamToJson } = require("../../utils");
const { Response } = require("../../response");

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
            // Обрабатываем запрос на отдачу статики
            let response = await this._app.handleStatic(req.url);

            // Или выполняем команду
            const apiPrefix = "/api/";
            if (!response && req.url.startsWith(apiPrefix)) {
                const params = req.method === 'POST' ? await streamToJson(req) : {} ;
                const headers = req.headers ?? {};
                const command = req.url.slice(apiPrefix.length);
                response = await this._app.handleCommand(command, params, headers);
            }

            if (!response) response = new Response('Страница не найдена')
                .setCode(404)
                .setStatus("NotFoundError");

            res.writeHead(response.code, response.getHeaders());
            response.toStream().pipe(res);
        });
        return this;
    }

    async stop() {}
}

module.exports = {
    AdapterHttpService
}