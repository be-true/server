class TransportEcho {
    static service() {
        return {
            name: 'transport',
        }
    }

    async command(code, params, options) {
        return params;
    }
}

module.exports = {
    TransportEcho
}