const { Command } = require("@be-true/server");

class TestCommand extends Command {
    code = "test";

    handle(params) {
        return {
            params,
            test: new Date()
        }
    }
}

module.exports = {
    TestCommand
}