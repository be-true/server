'use_strict'

const { Client } = require("@be-true/server")

class ClientService extends Client {
    static service() {
        return {
            name: 'client',
            deps: ['transportChat'],
            scope: 'request',
        }
    }

    constructor(di) {
        super(di);
        this.chat = {
            userAuth: this.command("user/auth", di.transportChat),
        };
    }
}

module.exports = {
    ClientService
}