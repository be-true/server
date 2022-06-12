const { Command } = require("../../../lib");

class LoadCommand extends Command {
    code = "load";

    async handle(params, { client }) {
        return {
            fromAuth: (await client.chat.userAuth()).result,
            created: new Date()
        }
    }
}

module.exports = {
    LoadCommand
}