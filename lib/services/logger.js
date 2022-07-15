'use_strict'

const LEVEL_TRACE = 10;
const LEVEL_DEBUG = 20;
const LEVEL_INFO = 30;
const LEVEL_WARN = 40;
const LEVEL_ERROR = 50;
const LEVEL_FATAL = 60
const LEVEL_SILENT = Infinity;

const levelToName = {
    [LEVEL_TRACE]: "TRACE",
    [LEVEL_DEBUG]: "DEBUG",
    [LEVEL_INFO]: "INFO",
    [LEVEL_WARN]: "WARN",
    [LEVEL_ERROR]: "ERROR",
    [LEVEL_FATAL]: "FATAL",
    [LEVEL_SILENT]: "SILENT",
}

class LoggerService {
    static service() {
        return {
            name: "logger",
            config: {
                pretty: false
            }
        }
    }

    constructor(_, config) {
        this.config = config;
    }

    log() {
        const level = LEVEL_INFO;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    trace() {
        const level = LEVEL_TRACE;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    debug() {
        const level = LEVEL_DEBUG;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    info() {
        const level = LEVEL_INFO;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    warn() {
        const level = LEVEL_WARN;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    error() {
        const level = LEVEL_ERROR;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    fatal() {
        const level = LEVEL_FATAL;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    silent() {
        const level = LEVEL_SILENT;
        const params = this._prepareParams(level, arguments);
        this.output(params);
    }

    _now() {
        return new Date();
    }

    _prepareParams(level, args) {
        let msg, params = {};

        if (args.length === 1) {
            msg = args[0];
        }
        if (args.length === 2) {
            params = args[0];
            msg = args[1];
        }

        return {
            time: this._now(),
            level,
            msg,
            ...params
        }
    }

    _pretty(params) {
        const { level, time, msg, ...rest } = params;
        const restLength = Object.keys(rest).length;
        const levelName = levelToName[level];
        const levelNameRest = " ".repeat(6 - levelName.length);
        const timeString = typeof time === 'string'? time : time.toISOString();
        let result = `[${levelName}]:${levelNameRest} ${timeString} - ${msg}` + (restLength > 0 ? `\n` : '');
        let i = 1;
        for (const [key, value] of Object.entries(rest)) {
            let suffix = '\n';
            if (i++ >= restLength) suffix = ''; 
            result += `          ${key}: ${value}` + suffix;
        }

        return result;
    }

    output(params) {
        if (this.config.pretty) {
            console.log(this._pretty(params));
        } else {
            console.log(JSON.stringify(params));
        }
    }
}

module.exports = {
    LoggerService
}