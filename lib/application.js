'use_strict'

const { sortServices, mergeServiceMeta } = require("./utils");
const { ApplicationGetCommands } = require("./commands");
const { Response } = require("./response");
const { LoggerService } = require("./services");

class Application {
    _commands = {};
    _di = {};
    _services = [];

    constructor() {
        this.addCommand(new ApplicationGetCommands());
    }

    addCommand(command) {
        this._commands[command.getCode()] = command;
        return this;
    }

    addService(serviceClass, meta) {
        const defaulted = { serviceClass };
        const metaMerged = mergeServiceMeta(defaulted, serviceClass.service(), meta);
        this._services.push(metaMerged);
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
        const logger = this._di['logger'] ?? new LoggerService(null, { config: { pretty: false } });
        const command = this._commands[commandCode];
        const availableCommands = Object.keys(this._commands);
        if (command === undefined) throw new Error(`Команда ${commandCode} не найдена. Доступные коды команд: ${availableCommands.join(", ")}`);
        logger.info({ params }, `Request ${commandCode}`);
        const response = Response.from(await command.handle(params, this._di));
        response.isJSON() && logger.info({ response: response.toJSON() }, `Response ${commandCode}`)
        return response;
    }

    async start() {
        this._di = { app: this };
        this._services = sortServices(this._services);
        let logger = console;
        for (const { create, name, config } of this._services) {
            const service = create(this._di, config);
            let inst = service;
            if (name === 'logger') logger = inst;
            logger.log(`Create '${name}' service`)
            if (typeof service.start === 'function') {
                inst = await service.start();
                logger.log(`Start '${name}' service`)
            }
            this._di[name] = inst;
        }
    }
}

module.exports = {
    Application
}