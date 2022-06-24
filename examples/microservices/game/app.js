'use_strict'

const { Application, LoggerService, HttpTransport } = require("../../../lib");
const { LoadCommand } = require("./commands/load");
const { ClientService } = require("./client");

const app = new Application()
    .addCommand(new LoadCommand())
    .addService(LoggerService)
    .addService(HttpTransport)
    .addClient(ClientService)
;

module.exports = { app };