function ensureServiceWithDeps(name, deps = []) {
    class func {
        constructor() { }
        static service() { return ({ name, deps }) }
    }
    return func;
}

module.exports = {
    ensureServiceWithDeps
}