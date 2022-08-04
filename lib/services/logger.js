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

const nameToLevel = {
    "TRACE": LEVEL_TRACE,
    "DEBUG": LEVEL_DEBUG,
    "INFO": LEVEL_INFO,
    "WARN": LEVEL_WARN,
    "ERROR": LEVEL_ERROR,
    "FATAL": LEVEL_FATAL,
    "SILENT": LEVEL_SILENT,
}

class LoggerService {
    static service() {
        return {
            name: "logger",
            config: {
                pretty: false,
                level: 'info'
            }
        }
    }

    _params = {};

    constructor(_, config) {
        const _config = config ?? LoggerService.service().config;
        const level = nameToLevel[_config?.level.toUpperCase() ?? 'INFO'];
        this.config = {
            ..._config,
            level
        };
    }

    setParams(params) {
        this._params = params;
    }

    log() {
        const level = LEVEL_INFO;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    trace() {
        const level = LEVEL_TRACE;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    debug() {
        const level = LEVEL_DEBUG;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    info() {
        const level = LEVEL_INFO;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    warn() {
        const level = LEVEL_WARN;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    error() {
        const level = LEVEL_ERROR;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    fatal() {
        const level = LEVEL_FATAL;
        const params = this._prepareParams(level, arguments);
        if (params !== false) {
            this.output(params);
        }
    }

    _now() {
        return new Date();
    }

    _prepareParams(level, args) {
        let msg, params = {};
        if (level < this.config.level) return false;

        if (args.length === 1) {
            msg = args[0];
        }
        if (args.length === 2) {
            params = args[0];
            msg = args[1];
        }

        const paramsResult = Object.assign({}, this._params, params);

        return {
            time: this._now(),
            level,
            msg,
            ...paramsResult
        }
    }

    _pretty(params) {
        const { level, time, msg, ...rest } = params;
        const lines = [];
        const levelName = levelToName[level];
        const spaces = " ".repeat(Math.abs(5 - levelName.length));
        const timeString = typeof time === 'string'? time : time.toISOString().substr(11, 12);
        lines.push(`[${levelName}]:${spaces} ${timeString} - ${msg}`)
        for (const [key, value] of Object.entries(rest)) {
            const valueString = typeof value === 'object' ? JSON.stringify(value) : value;
            lines.push(`          ${key}: ${valueString}`);
        }
        return lines.join("\n");
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