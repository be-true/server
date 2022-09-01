const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#asArrayString другой разделитель", async (test) => {
    const item = new ConfigItem();
    item.default('one|two').splitter('|').asArrayString()
    test.strictEqual(item.get(), ['one', 'two']);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayString одно значение", async (test) => {
    const item = new ConfigItem();
    item.default('one').asArrayString()
    test.strictEqual(item.get(), ['one']);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayString два значение", async (test) => {
    const item = new ConfigItem();
    item.default('one,two').asArrayString()
    test.strictEqual(item.get(), ['one', 'two']);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayInteger одно значение", async (test) => {
    const item = new ConfigItem();
    item.default('1').asArrayInteger()
    test.strictEqual(item.get(), [1]);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayInteger два значение", async (test) => {
    const item = new ConfigItem();
    item.default('1,2').asArrayInteger()
    test.strictEqual(item.get(), [1, 2]);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayBoolean одно значение", async (test) => {
    const item = new ConfigItem();
    item.default('True').asArrayBoolean()
    test.strictEqual(item.get(), [true]);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayBoolean два значение", async (test) => {
    const item = new ConfigItem();
    item.default('true,0').asArrayBoolean()
    test.strictEqual(item.get(), [true, false]);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayUrl одно значение", async (test) => {
    const item = new ConfigItem();
    item.default('http://asd.run//').asArrayUrl()
    test.strictEqual(item.get(), ['http://asd.run']);
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asArrayUrl два значение", async (test) => {
    const item = new ConfigItem();
    item.default('http://asd.run, https://olo.run/').asArrayUrl()
    test.strictEqual(item.get(), ['http://asd.run', 'https://olo.run']);
    test.strictEqual(item.hasError(), false);
});