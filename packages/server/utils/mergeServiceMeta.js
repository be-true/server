'use_strict'

function mergeServiceMeta(defaulted = {}, meta = {}, override = {}) {
    const mergedMeta = Object.assign({}, meta, override);

    if (defaulted.service === undefined) throw new Error("Необходимо передать поле 'service' в переменной defaulted");
    if (defaulted.deps === undefined) {
        defaulted.deps = [];
    }
    if (defaulted.create === undefined) {
        defaulted.create = (di, config) => {
            return mergedMeta.as === 'value' 
                ? defaulted.service
                : new defaulted.service(di, config);
        };
    }
    
    const config = Object.assign({}, meta.config ?? {}, override.config ?? {});
    return Object.assign({}, defaulted, mergedMeta, { config });
}

module.exports = {
    mergeServiceMeta
}