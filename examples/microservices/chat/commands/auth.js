const { Command } = require("../../../../lib");

class AuthCommand extends Command {
    code = "user/auth";

    handle(params) {
        return {
            token: "any-token"
        }
    }
}

module.exports = {
    AuthCommand
}