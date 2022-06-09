const { SERVICE } = require("./_names");
const { AdapterHttpService } = require("./adapter-http");
const { AdapterWSService } = require("./adapter-ws");
const { HttpService } = require("./http");
const { LoggerService } = require("./logger");

module.exports = {
    SERVICE,
    AdapterHttpService,
    AdapterWSService,
    HttpService,
    LoggerService
}