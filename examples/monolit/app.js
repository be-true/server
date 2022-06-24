'use_strict'

const { Application, LoggerService, AdapterHttpService, AdapterWSService, HttpService } = require("../../lib");
const { LoadCommand } = require("./commands/load");

const app = new Application()
    .addCommand(new LoadCommand())
    .addService(LoggerService)
    .addService(HttpService)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
;

module.exports = { app };