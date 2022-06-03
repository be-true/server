'use_strict'
const { sortServices } = require("./utils/sortServices");

class Application {
    _commands = {};
    _di = {};
    _services = [];

    addCommand(command) {
        this._commands[command.getCode()] = command;
        return this;
    }

    addService(service) {
        const meta = service.service();
        this._services.push({
            create: (di) => new service(di),
            name: meta.name,
            deps: meta.deps ?? [],
        });
        return this;
    }

    handleCommand(code, params) {
        const command = this._commands[code];
        const availableCommands = Object.keys(this._commands);
        if (command === undefined) throw new Error(`Команда ${code} не найдена. Доступные коды команд: ${availableCommands.join(", ")}`);
        return command.handle(params);
    }

    async start() {
        this._di = { app: this };
        this._services = sortServices(this._services);
        let logger = console;
        for (const { create, name } of this._services) {
            const service = create(this._di);
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