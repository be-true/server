const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#require", async (test) => {
    const item = new ConfigItem();
    item.default('one').required().asString()
    test.strictEqual(item.get(), 'one');
    test.strictEqual(item.hasError(), false);
});