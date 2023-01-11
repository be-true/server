'use_strict'

const path = require('path');
const { fileHash, fileExist } = require('@be-true/utils');

const { StaticError } = require('../errors');

const urlFile = (config) => async (filePath, options = { hash: false }) => {
    const { hash } = options;
    const pathFull = path.join(config.root, filePath);
    if (!await fileExist(pathFull)) throw new StaticError(`File "${filePath}" not found`);
    let hashSuffix = hash ? '?hash=' + await fileHash(pathFull, 'sha1'): '';
    const prefix = config.prefix ?? '';
    return path.join(prefix, filePath) + hashSuffix;
}

module.exports = {
    urlFile
}