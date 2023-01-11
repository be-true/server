'use_strict'

const fs = require("fs");
const crypto = require('crypto');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

const ALLOWED_ALGORITHM = ['sha1', 'sha256'];

/**
 * Вычисляет hash от файла
 * 
 * @param {String} path - путь до файла
 * @param {String} algorithm - алгоритм один из: 'sha1', 'sha256'
 * @return {Promise<string>}
 */
async function fileHash(path, algorithm) {
    if (!ALLOWED_ALGORITHM.includes(algorithm)) throw new Error("Доступны только следующие значения алгоритмов: " + ALLOWED_ALGORITHM.join(', '))
    var fd = fs.createReadStream(path);
    var hashStream = crypto.createHash(algorithm).setEncoding('hex');
    await pipeline(fd, hashStream);
    return hashStream.read();
}

module.exports = {
    fileHash
}