'use_strict'

const { Gate, HttpService, LoggerService, AdapterHttpService, AdapterWSService, Client, HttpTransport } = require("../../../lib");

const app = new Gate()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(HttpService, { config: { port: 3000 }})
    .addService(HttpTransport, { name: 'transportGame', config: { port: 3001 } })
    .addService(HttpTransport, { name: 'transportChat', config: { port: 3002 } })
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
    .addClient(Client, { deps: ['transportGame', 'transportChat'] })
    .proxyCommands("game", ["load"], { transport: 'transportGame' })
;

module.exports = { app };