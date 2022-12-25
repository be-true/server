const stream = require('stream');
const metatests = require("metatests");
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

const { Transform } = require("../../../services/static/transform");
const { once } = require('events');

class TestRead extends stream.Readable {
    constructor(chunks = [], options) {
        super(options);
        for (const chunk of chunks) this.push(chunk);
        chunks.length && this.push(null);
    }
    _read(size) {}
}

class TestWrite extends stream.Writable {
    result = '';
    _write(chunk, encoding, callback) {
        this.result += chunk.toString();
        callback(null);
    }
}

metatests.testAsync("Transform. Only text", async (test) => {
    const read = new TestRead(['A', 'BC']);
    const transform = new Transform();
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'ABC');
});

metatests.testAsync("Transform.config(). Value from config", async (test) => {
    const read = new TestRead(['any text "{{ config("param_1", "any_default") }}"']);
    const transform = new Transform().setConfig({ param_1: 'from_config' });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'any text "from_config"');
});

metatests.testAsync("Transform.config(). Value from default", async (test) => {
    const read = new TestRead(['any text "{{ config("param_1", "any_default") }}"']);
    const transform = new Transform();
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'any text "any_default"');
});

// metatests.testAsync("Transform: url", async (test) => {
//     const read = new TestRead(['any text {{ url("page/1") }}']);
// });

// metatests.testAsync("Transform: fileUrl", async (test) => {
//     const read = new TestRead(['any text {{ fileUrl("./path.to.file", { timestamp: true }) }}']);
// });

// metatests.testAsync("Transform: split function", async (test) => {
//     const read = new TestRead(['any text {{ conf', 'ig("PARAM_1", "default_value") }}']);
// });

// metatests.testAsync("Transform: several functions", async (test) => {
//     const read = new TestRead(['any text {{ url("page/1") }}, {{ url("page/2") }}']);
// });