'use_strict'

const { Application, LoggerService, AdapterHttpService, HttpService } = require("@be-true/server");
const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { ResponseWithCodeCommand } = require("./commands/responseWithCode");

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
    .addCommand(new ResponseWithCodeCommand())
    .addService(HttpService, { config: { port: 3002 }})
    .addService(AdapterHttpService)
;

module.exports = { app };