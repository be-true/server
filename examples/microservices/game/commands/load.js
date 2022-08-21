const { Command } = require("@be-true/server");

class LoadCommand extends Command {
    code = "load";

    async handle(params, { client }) {
        const _params = { ...params, age: 18 };
        return {
            fromAuth: (await client.chat.userAuth(_params)).result,
            created: new Date()
        }
    }
}

module.exports = {
    LoadCommand
}