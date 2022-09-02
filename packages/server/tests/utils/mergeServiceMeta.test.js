const metatests = require("metatests");
const { mergeServiceMeta } = require("../../../server/utils");

const defaulted = { service: class {} };
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

metatests.testSync("mergeServiceMeta: required 'service' params", (test) => {
    try {
        mergeServiceMeta();
        test.strictEqual(false, true);
    } catch (e) {
        test.strictEqual(e instanceof Error, true);
        test.strictEqual(e.message, "Необходимо передать поле 'service' в переменной defaulted");
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
});

metatests.testSync("mergeServiceMeta: from override", (test) => {
    const merged = mergeServiceMeta(defaulted, meta, override);
    test.strictEqual(merged.name, override.name);
    test.strictEqual(merged.deps, override.deps);
});

metatests.testSync("mergeServiceMeta: as value", (test) => {
    const merged = mergeServiceMeta({ service: 42 }, { }, { name: 'answer', as: 'value' });
    test.strictEqual(merged.create({}, {}), 42);
});