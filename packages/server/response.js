'use_strict'

const { stringToStream } = require("./utils");

class Response {

    #headers = new Map();

    static from(value) {
        if (value instanceof Response) return value;
        else return new Response(value);
    }

    constructor(result) {
        this.result = result;
        this.code = 200;
        this.status = 'Success';
    }

    setCode(code) {
        this.code = code;
        return this;
    }

    setStatus(status) {
        this.status = status;
        return this;
    }

    setResult(result) {
        this.result = result;
        return this;
    }

    setHeaders(headers) {
        for (const [name, value] of Object.entries(headers)) {
            if (value === undefined || value === null || value === '') continue;
            this.#headers.set(name, value);
        }
        return this;
    }

    setHeader(name, value) {
        this.#headers.set(name, value);
        return this;
    }

    getHeaders() {
        const result = {};
        for (const [name, value] of this.#headers) {
            result[name] = value;
        }
        return result;
    }

    isJSON() {
        return true;
    }

    toJSON() {
        const json = {
            code: this.code,
            status: this.status,
            result: this.result,
        }

        return json;
    }

    toStream() {
        if (this.result instanceof Buffer) return stringToStream(this.result);
        return stringToStream(JSON.stringify(this.toJSON()));
    }
}

module.exports = {
    Response
}