'use_strict'

const { Application, LoggerService } = require("../../lib");
const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { ResponseWithCodeCommand } = require("./commands/responseWithCode");

const app = new Application()
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
    .addCommand(new ResponseWithCodeCommand())
    .addService(LoggerService)
;

module.exports = { app };