const { SERVICE } = require("./_names");

class LoggerService {
    static service() {
        return {
            name: SERVICE.logger,
        }
    }

    log(...params) {
        console.log("[ Logger ]:", ...params);
    }
}

module.exports = {
    LoggerService
}