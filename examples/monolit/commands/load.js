const { Command } = require("../../../lib");

class LoadCommand extends Command {
    code = "load";

    async handle(params) {
        return {
            created: new Date()
        }
    }
}

module.exports = {
    LoadCommand
}