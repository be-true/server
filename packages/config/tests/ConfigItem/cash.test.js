const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem: Кэш после override должен скинуться", async (test) => {
    const item = new ConfigItem();
    item.default(0).asInteger()
    item.override(10);
    test.strictEqual(item.get(), 10);
});

metatests.testAsync("ConfigItem: Кэш после override должен скинуться", async (test) => {
    const item = new ConfigItem();
    item.default('0').get()
    item.asInteger();
    test.strictEqual(item.get(), 0);
});