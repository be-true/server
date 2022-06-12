'use_strict'

const { Application, HttpService, LoggerService, AdapterHttpService } = require("../../lib");
const { HttpService2 } = require("./services/http");
const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { ResponseWithCodeCommand } = require("./commands/responseWithCode");

const app = new Application()
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
    .addCommand(new ResponseWithCodeCommand())
    .addService(LoggerService)
    .addService(HttpService2)
    .addService(AdapterHttpService)
;

module.exports = { app };