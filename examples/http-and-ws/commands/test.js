const { Command } = require("../../../lib");

class TestCommand extends Command {
    code = "test";

    handle(params) {
        return {
            test: new Date()
        }
    }
}

module.exports = {
    TestCommand
}