'use_strict'

class Client {
    static service() {
        return {
            name: 'client',
            deps: ['transport', 'request'],
            scope: 'request'
        }
    }

    constructor(di) {
        const { app, request } = di ?? {};
        this._request = request;

        // Если были добавлены в приложение команды для проксирования
        // То устанавливаем их
        if (app) {
            for (const {appName, commandName, options} of app.getProxyCommands()) {
                const transport = di[options.transport];
                this.resetterCommand(appName, commandName, transport);
            }
        }
    }

    command(code, transport) {
        return (params, headers) => {
            const _headers = this._makeHeaders(headers);
            return transport.command(code, params, _headers);
        } 
    }

    resetterCommand(appName, code, transport) {
        const self = this;
        self[appName] = self[appName] ?? {};
        self[appName][code] = this.command(code, transport);
    }

    _makeHeaders(headers) {
        let _headers = {};
        if (this._request && this._request.traceId) {
            _headers = {
                'x-trace-id': this._request.traceId,
            }
        }

        const result = { ...headers, ..._headers };
        // Удаляем content-length, так как при проксирование размер
        // тела меняется и http запрос зависает при неверном значении
        delete result['content-length'];
        return result;
    }
}

module.exports = {
    Client
}