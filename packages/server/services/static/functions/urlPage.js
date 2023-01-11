'use_strict'

const path = require('path');

const urlPage = (config) => (url) => path.join(config.prefix ?? '', url);

module.exports = {
    urlPage
}