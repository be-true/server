'use_strict'

const { sortServices, mergeServiceMeta } = require("./utils");

class DI {
    _di = {}
    _services = [];

    addService(serviceClass, meta) {
        const defaulted = { serviceClass };
        const merged = mergeServiceMeta(defaulted, serviceClass.service(), meta);
        this._services.push(merged);
    }

    get(name) {
        return this._di[name];
    }

    export() {
        return this._di;
    }

    scope(name) {

    }

    async start(app) {
        this._di = { app };
        this._services = sortServices(this._services);
        let logger = console;
        for (const { create, name, config } of this._services) {
            const service = create(this._di, config);
            let inst = service;
            if (name === 'logger') logger = inst;
            logger.log(`Create '${name}' service`)
            if (typeof service.start === 'function') {
                inst = await service.start();
                logger.log(`Start '${name}' service`)
            }
            this._di[name] = inst;
        }
    }
}

module.exports = {
    DI
}