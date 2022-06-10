'use_strict'

module.exports = {
    SERVICE: require("./_names").SERVICE,
    AdapterHttpService: require("./adapter-http").AdapterHttpService,
    AdapterWSService: require("./adapter-ws").AdapterWSService,
    HttpService: require("./http").HttpService,
    LoggerService: require("./logger").LoggerService
}