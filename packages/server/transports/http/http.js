'use_strict'

const http = require("http");
const { Config } = require("@be-true/config");

class HttpConfig extends Config {
    description = 'WEB сервер';
    constructor() {
        super();
        this.host = this.param('host')
            .default('127.0.0.1')
            .fromEnv('HTTP_HOST')
            .description('HOST WEB сервера')
            .required()
            .asString();
            
        this.port = this.param('port')
            .default(3000)
            .fromEnv('HTTP_PORT')
            .description('Port WEB сервера')
            .required()
            .asInteger();
    }
}

class HttpService {
    _logger;
    _server
    static service() {
        return {
            name: "http",
            deps: ["logger"],
            scope: 'singleton',
            config: new HttpConfig()
        }
    }

    constructor({ logger }, config) {
        this._logger = logger;
        this._config = config ?? new HttpConfig();
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