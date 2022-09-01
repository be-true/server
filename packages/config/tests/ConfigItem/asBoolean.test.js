const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#asBoolean required", async (test) => {
    const item = new ConfigItem();
    item.required().asBoolean()
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asBoolean передано как 'true'", async (test) => {
    const item = new ConfigItem();
    item.default('true').asBoolean()
    test.strictEqual(item.get(), true);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как 'TRUE'", async (test) => {
    const item = new ConfigItem();
    item.default('TRUE').asBoolean()
    test.strictEqual(item.get(), true);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как 'True'", async (test) => {
    const item = new ConfigItem();
    item.default('True').asBoolean()
    test.strictEqual(item.get(), true);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как '1'", async (test) => {
    const item = new ConfigItem();
    item.default('1').asBoolean()
    test.strictEqual(item.get(), true);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как 'false'", async (test) => {
    const item = new ConfigItem();
    item.default('false').asBoolean()
    test.strictEqual(item.get(), false);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как 'FALSE'", async (test) => {
    const item = new ConfigItem();
    item.default('FALSE').asBoolean()
    test.strictEqual(item.get(), false);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как 'False'", async (test) => {
    const item = new ConfigItem();
    item.default('False').asBoolean()
    test.strictEqual(item.get(), false);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asBoolean передано как '0'", async (test) => {
    const item = new ConfigItem();
    item.default('0').asBoolean()
    test.strictEqual(item.get(), false);
    test.strictEqual(item.hasError(), false);
});