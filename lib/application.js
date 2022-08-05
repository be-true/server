'use_strict'

const { ApplicationGetCommands } = require("./commands");
const { Response } = require("./response");
const { LoggerService } = require("./services");
const { DI } = require("./di");
const { generateHash } = require("./utils/generateHash");

class Application {
    _commands = {};

    constructor() {
        this.di = new DI();
        this.di.addService({ traceId: null }, { name: 'request', as: 'value' });
        this.addCommand(new ApplicationGetCommands());
    }

    addCommand(command) {
        this._commands[command.getCode()] = command;
        return this;
    }

    addService(service, meta) {
        this.di.addService(service, meta);
        return this;
    }

    addClient(client, meta) {
        this.addService(client, meta);
        return this;
    }

    getCommands() {
      return Object.values(this._commands);
    }

    async handleCommand(commandCode, params, headers) {
        const di = await this._prepareDI(commandCode, params, headers);
        const logger = di.get('logger') ?? new LoggerService(null, { config: { pretty: false } });
        const command = this._commands[commandCode];
        if (command === undefined) {
            const availableCommands = Object.keys(this._commands);
            throw new Error(`Команда ${commandCode} не найдена. Доступные коды команд: ${availableCommands.join(", ")}`);
        }
        logger.info({ params }, `Command ${commandCode}`);
        const response = Response.from(await command.handle(params, di.export(), headers));
        response.isJSON() && logger.info({ response: response.toJSON() }, `Response ${commandCode}`)
        return response;
    }

    async start() {
        await this.di.start(this);
    }

    async _prepareDI(commandCode, params, headers) {
        const traceId = headers !== undefined ? headers['x-trace-id'] ?? generateHash(32) : undefined ;
        const di = this.di.clone();
        di.setService('request', { traceId });
        await di.scope();
        di.get('logger').setParams(di.get('request'));
        return di;
    }
}

module.exports = {
    Application
}