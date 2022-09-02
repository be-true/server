const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#get default", async (test) => {
    const item = new ConfigItem();
    item.default(0)
    test.strictEqual(item.get(), 0);
});

metatests.testAsync("ConfigItem:#get fromEnv", async (test) => {
    const item = new ConfigItem();
    process.env['ENV_NAME'] = 'test';
    item.default(0).fromEnv('ENV_NAME')
    test.strictEqual(item.get(), 'test');
    delete process.env['ENV_NAME'];
});

metatests.testAsync("ConfigItem:#get override", async (test) => {
    const item = new ConfigItem();
    process.env['ENV_NAME'] = 'test';
    item.default(0).fromEnv('ENV_NAME').override(123);
    test.strictEqual(item.get(), 123);
    delete process.env['ENV_NAME'];
});