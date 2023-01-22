class TransportEcho {
    static service() {
        return {
            name: 'transport',
        }
    }

    async command(code, params, options) {
        return {
            code: 200,
            status: 'Success',
            result: params
        };
    }
}

module.exports = {
    TransportEcho
}