const metatests = require("metatests");
const { mergeServiceMeta } = require("../../lib/utils");

const defaulted = { serviceClass: class {} };
const meta = {
    name: 'serviceName',
    deps: ['service1', 'service2'],
    config: { param1: 1, param2: 2 },
}
const override = {
    name: 'serviceNameOverride',
    deps: ['service1', 'service2', 'service3'],
    config: { param1: -1, param3: 3 },
}

metatests.testSync("mergeServiceMeta: required serviceClass params", (test) => {
    try {
        mergeServiceMeta();
        test.strictEqual(false, true);
    } catch (e) {
        test.strictEqual(e instanceof Error, true);
        test.strictEqual(e.message, 'Необходимо передать поле serviceClass в переменной defaulted');
    }
});

metatests.testSync("mergeServiceMeta: default create", (test) => {
    const merged = mergeServiceMeta(defaulted, {}, {});
    test.strictEqual(typeof merged.create === 'function', true);
});

metatests.testSync("mergeServiceMeta: default deps", (test) => {
    const merged = mergeServiceMeta(defaulted, {}, {});
    test.strictEqual(typeof merged.create === 'function', true);
});

metatests.testSync("mergeServiceMeta: from meta", (test) => {
    const merged = mergeServiceMeta(defaulted, meta, {});
    test.strictEqual(merged.name, meta.name);
    test.strictEqual(merged.deps, meta.deps);
    test.strictEqual(merged.config, meta.config);
});

metatests.testSync("mergeServiceMeta: from override", (test) => {
    const merged = mergeServiceMeta(defaulted, meta, override);
    test.strictEqual(merged.name, override.name);
    test.strictEqual(merged.deps, override.deps);
    console.log(merged.config);
    test.strictEqual(merged.config, {
        param1: -1,
        param2: 2,
        param3: 3,
    });
});