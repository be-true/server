'use_strict'

const stream = require('stream');
const { StaticError } = require('./errors');
const { config, urlPage, urlFile } = require('./functions');

const LENGTH_HANDLEBARS = 2;
class Transform extends stream.Transform {
    #config = {};
    #functions;
    #text = '';

    setConfig(config) {
        this.#config = config;
        return this;
    }

    *#purseChunk(chunk) {
        this.#text += chunk.toString();

        let run = true;
        while(run) {
            const start = this.#text.indexOf('{{');
            const end = this.#text.indexOf('}}');
            // Если нет выражения
            if (start === -1 && end === -1) {
                if (this.#text !== '') yield this.#text;
                this.#text = '';
                run = false;
            // Если вошло целиком
            } else if (start !== -1 && end !== -1) {
                if (start > end) throw new StaticError('Скобки открытия и закрытия выражения перепутаны');
                yield this.#text.substring(0, start);
                yield this.#text.substring(start, end + 2);
                this.#text = this.#text.substring(end + 2);
            // Если Выражение разрезано посередине
            } else if (start !== -1 && end === -1) {
                run = false; // Заканчиваем, в следующем цикле заберем остаток
                if (this.#text.length - start >= 100) throw new StaticError('Превышена максимальная длина в 100 знаков для выражения');
            }
        }
    }

    #getFunctions() {
        if (this.#functions) return this.#functions;
        const functions = {
            config: config(this.#config),
            urlPage: urlPage(this.#config),
            urlFile: urlFile(this.#config),
        }
        return this.#functions = {
            names: Object.keys(functions),
            functions: Object.values(functions),
        };
    }

    async _transform(chunk, encoding, callback) {
        for (const part of this.#purseChunk(chunk)) {
            if (part.startsWith('{{') && part.endsWith('}}')) {
                const { names, functions } = this.#getFunctions();
                const fnText = 'return ' + part.substring(2, part.length - 2).trim();
                const fn = new Function(...names, fnText);
                const result = await fn(...functions);
                this.push(result);
            } else {
                this.push(part);
            }
        }
        callback();
    }
}

module.exports = {
    Transform
}