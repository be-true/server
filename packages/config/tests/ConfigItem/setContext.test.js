const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#setContext не указан ENV", async (test) => {
    const item = new ConfigItem();
    test.strictEqual(item.export().env, undefined);
});

metatests.testAsync("ConfigItem:#setContext не указан в имени ENV переменной", async (test) => {
    const item = new ConfigItem();
    item.fromEnv('POSTGRES_USER')
    test.strictEqual(item.export().env, 'POSTGRES_USER');
});

metatests.testAsync("ConfigItem:#setContext не указан в имени ENV переменной но передан", async (test) => {
    const item = new ConfigItem();
    item.fromEnv('POSTGRES_USER').setContext("DB2");
    test.strictEqual(item.export().env, 'DB2_POSTGRES_USER');
});

metatests.testAsync("ConfigItem:#setContext указан в имени ENV переменной, но не передан", async (test) => {
    const item = new ConfigItem();
    item.fromEnv('POSTGRES_{context}_USER')
    test.strictEqual(item.export().env, 'POSTGRES_USER');
});

metatests.testAsync("ConfigItem:#setContext указан и передан", async (test) => {
    const item = new ConfigItem();
    item.fromEnv('POSTGRES_{context}_USER').setContext("DB2");
    test.strictEqual(item.export().env, 'POSTGRES_DB2_USER');
});

metatests.testAsync("ConfigItem:#setContext передан маленькими буквами", async (test) => {
    const item = new ConfigItem();
    item.fromEnv('POSTGRES_{context}_USER').setContext("db2");
    test.strictEqual(item.export().env, 'POSTGRES_DB2_USER');
});
