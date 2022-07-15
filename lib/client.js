'use_strict'

class Client {
    static service() {
        return {
            name: 'client',
            deps: ['transport']
        }
    }

    command(code, transport) {
        return (params, options) => {
            return transport.command(code, params, options);
        } 
    }

    resterCommand(appName, code, transport) {
        const self = this;
        self[appName] = self[appName] ? self[appName] : {};
        self[appName][code] = this.command(code, transport);
    }
}

module.exports = {
    Client
}