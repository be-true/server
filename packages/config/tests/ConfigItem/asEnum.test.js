const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#asEnum required", async (test) => {
    const item = new ConfigItem();
    item.required().asEnum(['warn', 'error', 'info', 'silent'])
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asEnum не из списка", async (test) => {
    const item = new ConfigItem();
    item.default('olo').asEnum(['warn', 'error', 'info', 'silent'])
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asEnum из списка", async (test) => {
    const item = new ConfigItem();
    item.default('warn').asEnum(['warn', 'error', 'info', 'silent'])
    test.strictEqual(item.get(), 'warn');
    test.strictEqual(item.hasError(), false);
});
