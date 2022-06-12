'use_strict'

class Client {
    command(code, transport) {
        return (params, options) => {
            return transport.command(code, params, options)
        } 
    }
}

module.exports = {
    Client
}