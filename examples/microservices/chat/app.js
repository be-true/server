'use_strict'

const { Application, LoggerService, AdapterHttpService, HttpService } = require("../../../lib");
const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { ResponseWithCodeCommand } = require("./commands/responseWithCode");

const app = new Application()
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
    .addCommand(new ResponseWithCodeCommand())
    .addService(HttpService, { config: { port: 3002 }})
    .addService(AdapterHttpService)
    .addService(LoggerService)
;

module.exports = { app };