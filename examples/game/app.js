'use_strict'

const { Application, HttpService, LoggerService, AdapterHttpService, AdapterWSService, HttpTransport } = require("../../lib");
const { LoadCommand } = require("./commands/load");
const { ClientService } = require("./client");

const app = new Application()
    .addCommand(new LoadCommand())
    .addService(LoggerService)
    .addService(HttpService)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
    .addService(HttpTransport)
    .addClient(ClientService)
;

module.exports = { app };