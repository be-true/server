const { Command } = require("../../../../lib");

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