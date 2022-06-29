'use_strict'

const { Gate, HttpService, LoggerService, AdapterHttpService, AdapterWSService } = require("../../../lib");

const app = new Gate()
    .addService(LoggerService)
    .addService(HttpService)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
    .proxyCommands("game", ["load"])
;

module.exports = { app };