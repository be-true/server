'use_strict'

const { sortServices, mergeServiceMeta, scopedServices } = require("./utils");

class DI {
    _changed = new Set();

    constructor(services = [], di = {}) {
        this._services = services;
        this._di = di;
    }

    addService(service, meta) {
        const defaulted = { service };
        const metaService = typeof service.service === 'function' ? service.service() : {};
        const merged = mergeServiceMeta(defaulted, metaService, meta);
        this._services.push(merged);
    }

    setService(name, service) {
        const item = this._services.find(i => i.name === name);
        if (item !== undefined) {
            item.service = service;
            item.create = () => service;
            this._changed.add(name);
        }
    }

    get(name) {
        return this._di[name];
    }

    export() {
        return this._di;
    }

    clone() {
        return new DI(this._services, this._di);
    }

    async scope() {
        await this._build(scopedServices(this._changed, this._services), true);
    }

    async start(app) {
        this._di = { app };
        this._services = sortServices(this._services);
        await this._build(this._services);
    }

    async _build(services, silent = false) {
        let logger = console;
        for (const { create, name, config } of services) {
            let inst = create(this._di, config);
            if (name === 'logger') logger = inst;
            !silent && logger.log(`DI: '${name}' - created`)
            if (typeof inst.start === 'function') {
                inst = await inst.start();
                !silent && logger.log(`DI: '${name}' -  started`)
            }
            this._di[name] = inst;
        }
    }
}

module.exports = {
    DI
}