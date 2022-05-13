const { Command } = require("../lib");

class TestCommand extends Command {
    code = "test";

    handle(params) {
        return {
            test: ""
        }
    }
}

module.exports = {
    TestCommand
}