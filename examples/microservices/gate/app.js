'use_strict'

const { Application, HttpService, LoggerService, AdapterHttpService, Client, HttpTransport, StaticService } = require("@be-true/server");
const { DocsService } = require("@be-true/docs");
const { AdapterWSService } = require("@be-true/ws");
const { AnyService } = require("./services/AnyService");

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(StaticService, { config: { prefix: '/static', root: __dirname + '/static' } })
    .addService(DocsService)
    .addService(HttpService, { config: { port: 3000 }})
    .addService(HttpTransport, { name: 'transportGame', config: { 
        _settings: { description: 'HTTP транспорт до сервиса GAME', context: "GAME" }, 
        port: 3001 
    }})
    .addService(HttpTransport, { name: 'transportChat', config: { 
        _settings: { description: 'HTTP транспорт до сервиса CHAT', context: "CHAT" }, 
        port: 3002 
    }})
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
    .addService(AnyService)
    .addClient(Client, { deps: ['transportGame', 'transportChat'] })
    .proxyCommands("game", ["load"], { transport: 'transportGame' })
;

module.exports = { app };