'use_strict'
const { Client } = require("../../../lib")

class ClientService extends Client {
    static service() {
        return {
            name: 'client',
            deps: ['transportChat']
        }
    }

    constructor({ transportChat }) {
        super();

        this.chat = {
            userAuth: this.command("user/auth", transportChat),
        };
    }
}

module.exports = {
    ClientService
}