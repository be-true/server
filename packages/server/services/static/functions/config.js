'use_strict'

const config = (config) => (field, defaultValue) => config[field] ?? defaultValue;

module.exports = {
    config
}