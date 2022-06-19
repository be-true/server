'use_strict'

class LoggerService {
    static service() {
        return {
            name: "logger",
        }
    }

    log(...params) {
        console.log("[ Logger ]:", ...params);
    }
}

module.exports = {
    LoggerService
}