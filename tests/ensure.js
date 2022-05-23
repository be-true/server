function ensureServiceWithDeps(name, deps = []) {
    return { name, deps };
}

module.exports = {
    ensureServiceWithDeps
}