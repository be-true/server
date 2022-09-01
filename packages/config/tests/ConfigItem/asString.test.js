const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#asString required", async (test) => {
    const item = new ConfigItem();
    item.required().asString()
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asString", async (test) => {
    const item = new ConfigItem();
    item.default('text').asString()
    test.strictEqual(item.get(), 'text');
    test.strictEqual(item.hasError(), false);
});