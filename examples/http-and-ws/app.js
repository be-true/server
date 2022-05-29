'use_strict'
const { Application } = require("../../lib");
const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { HttpService } = require("./services/http/http");
const { LoggerService } = require("./services/logger/logger");
const { AdapterHttpService } = require("./services/adapter-http/adapter-http");
const { AdapterWSService } = require("./services/adapter-ws/adapter-ws");

const app = new Application()
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
    .addService(HttpService)
    .addService(LoggerService)
    .addService(AdapterHttpService)
    .addService(AdapterWSService)
;

module.exports = {
    app
}