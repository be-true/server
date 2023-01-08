const stream = require('stream');
const path = require('path');
const metatests = require("metatests");
const util = require('util');
const pipeline = util.promisify(stream.pipeline);

const { Transform } = require("../../../services/static/transform");
const { StaticError } = require('../../../services/static/errors');

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

metatests.testAsync("Transform: urlPage", async (test) => {
    const read = new TestRead(['<a href="{{ urlPage("page/1") }}">Page 1</a>']);
    const transform = new Transform().setConfig({ prefix: '/content/' });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, '<a href="/content/page/1">Page 1</a>');
});

metatests.testAsync("Transform: fileUrl", async (test) => {
    const read = new TestRead(['<link rel="stylesheet" href="{{ urlFile("/any-file.txt") }}">']);
    const transform = new Transform().setConfig({ 
        root: path.join(__dirname, './_fixtures'),
        prefix: '/content/',
    });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, '<link rel="stylesheet" href="/content/any-file.txt">');
});

metatests.testAsync("Transform: fileUrl with hash", async (test) => {
    const read = new TestRead(['<link rel="stylesheet" href="{{ urlFile("/any-file.txt", { hash: true }) }}">']);
    const transform = new Transform().setConfig({ 
        root: path.join(__dirname, './_fixtures'),
        prefix: '/content/',
    });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, '<link rel="stylesheet" href="/content/any-file.txt?hash=e840eb6f9c8eecfeafa871f37cd483ff9e973cb9">');
});

metatests.testAsync("Transform: fileUrl not found", async (test) => {
    const read = new TestRead(['<link rel="stylesheet" href="{{ urlFile("/any-file-123.txt") }}">']);
    const transform = new Transform().setConfig({ 
        root: path.join(__dirname, './_fixtures'),
        prefix: '/content/',
    });
    const write = new TestWrite();
    try {
        await pipeline(read, transform, write);
        test.strictEqual(true, false);
    } catch (e) {
        test.strictEqual(e instanceof StaticError, true);
        test.strictEqual(e.message, 'File "/any-file-123.txt" not found');
    }
});

// metatests.testAsync("Transform: split function", async (test) => {
//     const read = new TestRead(['any text {{ conf', 'ig("PARAM_1", "default_value") }}']);
// });

// metatests.testAsync("Transform: several functions", async (test) => {
//     const read = new TestRead(['any text {{ urlPage("page/1") }}, {{ urlPage("page/2") }}']);
// });