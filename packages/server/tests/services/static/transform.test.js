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

metatests.testAsync("Transform. Текст не содержит выражение передается без изменения", async (test) => {
    const read = new TestRead(['A', 'BC']);
    const transform = new Transform();
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'ABC');
});

metatests.testAsync("Transform: функция config. Значение взято из конфигурации", async (test) => {
    const read = new TestRead(['any text "{{ config("param_1", "any_default") }}"']);
    const transform = new Transform().setConfig({ param_1: 'from_config' });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'any text "from_config"');
});

metatests.testAsync("Transform: функция config. Значение взято из параметра по умолчанию", async (test) => {
    const read = new TestRead(['any text "{{ config("param_1", "any_default") }}"']);
    const transform = new Transform();
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'any text "any_default"');
});

metatests.testAsync("Transform: функция urlPage", async (test) => {
    const read = new TestRead(['<a href="{{ urlPage("page/1") }}">Page 1</a>']);
    const transform = new Transform().setConfig({ prefix: '/content/' });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, '<a href="/content/page/1">Page 1</a>');
});

metatests.testAsync("Transform: функция fileUrl", async (test) => {
    const read = new TestRead(['<link rel="stylesheet" href="{{ urlFile("/any-file.txt") }}">']);
    const transform = new Transform().setConfig({ 
        root: path.join(__dirname, './_fixtures'),
        prefix: '/content/',
    });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, '<link rel="stylesheet" href="/content/any-file.txt">');
});

metatests.testAsync("Transform: функция fileUrl. С параметром hash", async (test) => {
    const read = new TestRead(['<link rel="stylesheet" href="{{ urlFile("/any-file.txt", { hash: true }) }}">']);
    const transform = new Transform().setConfig({ 
        root: path.join(__dirname, './_fixtures'),
        prefix: '/content/',
    });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, '<link rel="stylesheet" href="/content/any-file.txt?hash=e840eb6f9c8eecfeafa871f37cd483ff9e973cb9">');
});

metatests.testAsync("Transform: функция fileUrl", async (test) => {
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

metatests.testAsync("Transform: несколько функций в одном chunk-е", async (test) => {
    const read = new TestRead(['any text {{ urlPage("page/1") }}, {{ urlPage("page/2") }}']);
    const transform = new Transform().setConfig({ prefix: '/content/' });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'any text /content/page/1, /content/page/2');
});

metatests.testAsync("Transform: Скобки открытия и закрытия перепутаны", async (test) => {
    const read = new TestRead(['any text }} {{']);
    const transform = new Transform().setConfig({});
    const write = new TestWrite();
    try {
        await pipeline(read, transform, write);
        test.strictEqual(true, false);
    } catch (e) {
        test.strictEqual(e instanceof StaticError, true);
        test.strictEqual(e.message, 'Скобки открытия и закрытия выражения перепутаны');
    }
});

metatests.testAsync("Transform: Функция попала в разные chunk-и", async (test) => {
    const read = new TestRead(['any text {{ conf', 'ig("param_1", "default_value") }}']);
    const transform = new Transform().setConfig({ param_1: 'from_config' });
    const write = new TestWrite();
    await pipeline(read, transform, write);
    test.strictEqual(write.result, 'any text from_config');
});

metatests.testAsync("Transform: Функция попала в разные chunk-и. Нет долго закрытия, выдаем ошибку", async (test) => {
    const read = new TestRead(['any text {{', 'a'.repeat(101)]);
    const transform = new Transform().setConfig({});
    const write = new TestWrite();
    try {
        await pipeline(read, transform, write);
        test.strictEqual(true, false);
    } catch (e) {
        test.strictEqual(e instanceof StaticError, true);
        test.strictEqual(e.message, 'Превышена максимальная длина в 100 знаков для выражения');
    }
});