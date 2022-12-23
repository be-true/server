const { once } = require("events");
const { Readable, Writable } = require('stream');
const metatests = require("metatests");
const { Transform } = require("../../../services/static/transform");

class TestRead extends Readable {
    constructor(chunks = ['']) {
        super();
        for (const chunk of chunks) this.push(chunk);
        this.push(null);
    }
    _read(size) {}
}

class TestWrite extends Writable {
    result = '';
    _write(chunk, encoding, callback) {
        this.result += chunk.toString();
        console.log(chunk.toString());
        callback(null);
    }
}

metatests.testAsync("Transform: Info", async (test) => {
    const read = new TestRead(['A', 'BC']);
    const transform = new Transform();
    const write = new TestWrite();
    read.pipe(transform).pipe(write);
    await once(read, 'end');
    test.strictEqual(write.result, 'ABC')
});