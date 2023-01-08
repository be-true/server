'use_strict'

const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const stream = require('stream');
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

const { StaticError } = require('./errors');

const LENGTH_HANDLEBARS = 2;
class Transform extends stream.Transform {
    #config = {};
    #functions;

    setConfig(config) {
        this.#config = config;
        return this;
    }

    #purseChunk(chunk) {
        const text = chunk.toString();
        const start = text.indexOf('{{');
        const end = text.indexOf('}}');
        return { text, start, end };
    }

    #getFunctions() {
        if (this.#functions) return this.#functions;
        const functions = {
            config: (field, defaultValue) => this.#config[field] ?? defaultValue,
            urlPage: (url) => path.join(this.#config.prefix ?? '', url),
            urlFile: async (filePath, options = { hash: false }) => {
                const { hash } = options;
                const pathFull = path.join(this.#config.root, filePath);
                try {
                    await fs.promises.access(pathFull);
                } catch(e) {
                    throw new StaticError(`File "${filePath}" not found`);
                }
                let fileHash = '';
                if (hash) {
                    var fd = fs.createReadStream(pathFull);
                    var hashStream = crypto.createHash('sha1').setEncoding('hex');
                    await pipeline(fd, hashStream);
                    fileHash = '?hash=' + hashStream.read();
                }
                const prefix = this.#config.prefix ?? '';
                return path.join(prefix, filePath) + fileHash;
            },
        }
        return this.#functions = {
            names: Object.keys(functions),
            functions: Object.values(functions),
        };
    }

    async _transform(chunk, encoding, callback) {
        const { text, start, end } = this.#purseChunk(chunk);
        if (start !== -1 && end !== -1) {
            const { names, functions } = this.#getFunctions();
            const fnExpression = 'return ' + text.substring(start + LENGTH_HANDLEBARS, end).trim();
            const fn = new Function(...names, fnExpression);
            const result = text.substring(0, start) + 
                (await fn(...functions)) + 
                text.substring(end + LENGTH_HANDLEBARS)
            ;
            callback(null, result)
        } else {
            callback(null, chunk)
        }
    }
}

module.exports = {
    Transform
}