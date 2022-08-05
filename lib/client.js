'use_strict'

class Client {
    static service() {
        return {
            name: 'client',
            deps: ['transport'],
            // scope: 'request'
        }
    }

    command(code, transport) {
        return (params, headers) => {
            // const headers = this._makeHeaders(di, headers);
            const _headers = {
                'x-trace-id': '03ddffd8-4b61-48d3-b04b-aed73d203bca',
            };
            return transport.command(code, params, { ..._headers, ...headers });
        } 
    }

    resetterCommand(appName, code, transport) {
        const self = this;
        self[appName] = self[appName] ? self[appName] : {};
        self[appName][code] = this.command(code, transport);
    }

    _makeHeaders(di, headers) {
        const { request } = di ?? {};
        let _headers = {};
        if (request) {
            _headers = {
                'x-trace-id': request.traceId,
            }
        }

        return { ..._headers, ...headers };
    }
}

module.exports = {
    Client
}