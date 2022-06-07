const { Readable } = require('stream');

'use_strict'
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

    toJSON(params) {
        const json = {
            code: this.code,
            status: this.status,
            result: this.result,
        }

        return json;
    }

    toStream() {
        const stream = new Readable();
        stream.push('{ asd: "test" }');
        stream.push(null);
        return stream;
    }
}

module.exports = {
    Response
}