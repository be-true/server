'use_strict'

const { Gate, HttpService, LoggerService, AdapterHttpService, AdapterWSService, Client, HttpTransport } = require("../../../lib");

const app = new Gate()
    .addService(LoggerService)
    .addService(HttpService, { config: { port: 3000 }})
    .addService(HttpTransport)
    .addService(HttpTransport, { name: 'transportGame', config: { port: 3001 } })
    .addService(HttpTransport, { name: 'transportChat', config: { port: 3002 } })
    .addClient(Client)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
    .proxyCommands("game", ["load"])
;

module.exports = { app };