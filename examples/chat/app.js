'use_strict'

const { Application, HttpService, LoggerService, AdapterHttpService, AdapterWSService } = require("../../lib");
const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { ResponseWithCodeCommand } = require("./commands/responseWithCode");

const app = new Application()
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
    .addCommand(new ResponseWithCodeCommand())
    .addService(HttpService)
    .addService(LoggerService)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
;

module.exports = { app };