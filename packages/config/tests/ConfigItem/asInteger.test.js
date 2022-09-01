const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#asInteger required", async (test) => {
    const item = new ConfigItem();
    item.required().asInteger()
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asInteger число передано текстом", async (test) => {
    const item = new ConfigItem();
    item.default('2').asInteger()
    test.strictEqual(item.get(), 2);
    test.strictEqual(item.hasError(), false);
});