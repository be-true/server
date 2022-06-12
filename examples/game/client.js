'use_strict'
const { Client } = require("../../lib")

class ClientService extends Client {
    static service() {
        return {
            name: 'client',
            deps: ['transport']
        }
    }

    constructor({ transport }) {
        super();

        this.chat = {
            userAuth: this.command("user/auth", transport),
        };
    }
}

module.exports = {
    ClientService
}