const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#hasEnv нет", async (test) => {
    const item = new ConfigItem();
    item.asString()
    test.strictEqual(item.hasEnv(), false);
});

metatests.testAsync("ConfigItem:#hasEnv есть", async (test) => {
    const item = new ConfigItem();
    item.fromEnv('ENV_TEST').asString()
    test.strictEqual(item.hasEnv(), true);
});