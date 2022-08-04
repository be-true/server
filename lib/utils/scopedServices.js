'use_strict'

/** Сервисы которые изменены от контекста */
function scopedServices(changed, services) {
    const scoped = new Set(changed);
    for (const service of services) {
        if (scoped.has(service.name)) continue;
        if (service.scope === 'singleton') continue;
        if (service.scope === 'request') {
            scoped.add(service.name);
            continue;
        };
        if (service.deps === undefined) continue;
        const toAdd = service.deps.some(name => scoped.has(name));
        if (toAdd) {
            scoped.add(service.name);
        }
    }
    return services.filter(i => scoped.has(i.name));
}

module.exports = {
    scopedServices
}