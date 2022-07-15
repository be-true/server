'use_strict'

const { Application, LoggerService, HttpTransport, AdapterHttpService, HttpService } = require("../../../lib");
const { LoadCommand } = require("./commands/load");
const { ClientService } = require("./client");

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addCommand(new LoadCommand())
    .addService(HttpTransport, { name: 'transportChat', config: { port: 3002 } })
    .addService(HttpService, { config: { port: 3001 }})
    .addClient(ClientService)
    .addService(AdapterHttpService)
;

module.exports = { app };