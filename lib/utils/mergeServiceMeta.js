'use_strict'

function mergeServiceMeta(defaulted = {}, meta = {}, override = {}) {
    if (defaulted.serviceClass === undefined) throw new Error("Необходимо передать поле serviceClass в переменной defaulted");
    if (defaulted.deps === undefined) {
        defaulted.deps = [];
    }
    if (defaulted.create === undefined) {
        defaulted.create = (di, config) => new defaulted.serviceClass(di, config);
    }
    
    const config = Object.assign({}, meta.config ?? {}, override.config ?? {});
    return Object.assign({}, defaulted, meta, override, { config });
}

module.exports = {
    mergeServiceMeta
}