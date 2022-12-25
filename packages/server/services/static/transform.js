'use_strict'

const stream = require('stream');

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
            config: (field, defaultValue) => this.#config[field] ?? defaultValue
        }
        return this.#functions = {
            names: Object.keys(functions),
            functions: Object.values(functions),
        };
    }

    _transform(chunk, encoding, callback) {
        const { text, start, end } = this.#purseChunk(chunk);
        if (start !== -1 && end !== -1) {
            const { names, functions } = this.#getFunctions();
            const fnExpression = 'return ' + text.substring(start + LENGTH_HANDLEBARS, end).trim();
            const fn = new Function(...names, fnExpression);
            const result = text.substring(0, start) + 
                fn(...functions) + 
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