module.exports = {
    HttpService: require("./http/http").HttpService,
    HttpTransport: require("./http/http-transport").HttpTransport,
    AdapterHttpService: require("./http/http-adapter").AdapterHttpService,
    AdapterWSService: require("./ws/ws-adapter").AdapterWSService,
}