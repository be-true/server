const { LoggerService } = require("../..");

class LoggerTest extends LoggerService {
    logs = [];

    _now() { return new Date("2022-01-01T00:00:00.000Z") }

    output(params) {
        const _params = { ...params, time: params.time.toISOString() };
        if (this.config.pretty) {
            this.logs.push(this._pretty(params));
        } else {
            this.logs.push(_params);
        }
    }
}

module.exports = {
    LoggerTest
}