'use_strict'

const { stringToStream } = require("../lib/utils");

class Response {
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

    toJSON() {
        const json = {
            code: this.code,
            status: this.status,
            result: this.result,
        }

        return json;
    }

    toStream() {
        return stringToStream(JSON.stringify(this.toJSON()));
    }
}

module.exports = {
    Response
}