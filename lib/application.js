'use_strict'

class Application {
    commands = {};

    addCommand(command) {
        this.commands[command.getCode()] = command;
        return this;
    }

    handleCommand(code, params) {
        const command = this.commands[code];
        if (command === undefined) throw new Error("Команда не найдена");
        return command.handle(params);
    }
}

module.exports = {
    Application
}