const { once } = require("events");
const { Readable, Writable } = require('stream');
const metatests = require("metatests");
const { Transform } = require("../../../services/static/transform");

class TestRead extends Readable {
    constructor(chunks = [], options) {
        super(options);
        for (const chunk of chunks) this.push(chunk);
        chunks.length && this.push(null);
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

metatests.testAsync("Transform: only text", async (test) => {
    const read = new TestRead(['A', 'BC']);
    const transform = new Transform();
    const write = new TestWrite();
    read.pipe(transform).pipe(write);
    await once(read, 'end');
    test.strictEqual(write.result, 'ABC')
});

metatests.testAsync("Transform: config", async (test) => {
    const read = new TestRead(['any text {{config("PARAM_1", "default_value")}}']);
});

metatests.testAsync("Transform: url", async (test) => {
    const read = new TestRead(['any text {{ url("page/1") }}']);
});

metatests.testAsync("Transform: fileUrl", async (test) => {
    const read = new TestRead(['any text {{ fileUrl("./path.to.file", { timestamp: true }) }}']);
});

metatests.testAsync("Transform: split function", async (test) => {
    const read = new TestRead(['any text {{ conf', 'ig("PARAM_1", "default_value") }}']);
});

metatests.testAsync("Transform: several functions", async (test) => {
    const read = new TestRead(['any text {{ url("page/1") }}, {{ url("page/2") }}']);
});