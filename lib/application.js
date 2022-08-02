'use_strict'

const { ApplicationGetCommands } = require("./commands");
const { Response } = require("./response");
const { LoggerService } = require("./services");
const { DI } = require("./di");

class Application {
    _commands = {};

    constructor() {
        this.di = new DI();
        this.addCommand(new ApplicationGetCommands());
    }

    addCommand(command) {
        this._commands[command.getCode()] = command;
        return this;
    }

    addService(serviceClass, meta) {
        this.di.addService(serviceClass, meta);
        return this;
    }

    addClient(client, meta) {
        this.addService(client, meta);
        return this;
    }

    getCommands() {
      return Object.values(this._commands);
    }

    async handleCommand(commandCode, params) {
        const logger = this.di.get('logger') ?? new LoggerService(null, { config: { pretty: false } });
        const command = this._commands[commandCode];
        const availableCommands = Object.keys(this._commands);
        if (command === undefined) throw new Error(`Команда ${commandCode} не найдена. Доступные коды команд: ${availableCommands.join(", ")}`);
        logger.info({ params }, `Request ${commandCode}`);
        const response = Response.from(await command.handle(params, this.di.export()));
        response.isJSON() && logger.info({ response: response.toJSON() }, `Response ${commandCode}`)
        return response;
    }

    async start() {
        await this.di.start(this);
    }
}

module.exports = {
    Application
}