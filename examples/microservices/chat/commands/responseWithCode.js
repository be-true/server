const { Command, Response } = require("../../../../lib");

class ResponseWithCodeCommand extends Command {
    code = "responseWithCode";

    handle(params) {
        return new Response({
            created: new Date()
        }).setCode(203)
    }
}

module.exports = {
    ResponseWithCodeCommand
}