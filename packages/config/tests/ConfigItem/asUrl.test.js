const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#asUrl required", async (test) => {
    const item = new ConfigItem();
    item.required().asUrl()
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asUrl", async (test) => {
    const item = new ConfigItem();
    item.default('http://asd.ru/asd').asUrl()
    test.strictEqual(item.get(), 'http://asd.ru/asd');
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asUrl удаляет / на конце", async (test) => {
    const item = new ConfigItem();
    item.default('https://asd.ru/asd/').asUrl()
    test.strictEqual(item.get(), 'https://asd.ru/asd');
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asUrl удаляет // на конце", async (test) => {
    const item = new ConfigItem();
    item.default('https://asd.ru/asd//').asUrl()
    test.strictEqual(item.get(), 'https://asd.ru/asd');
    test.strictEqual(item.hasError(), false);
});

metatests.testAsync("ConfigItem:#asUrl без http и https выдает ошибку", async (test) => {
    const item = new ConfigItem();
    item.default('asd.ru/asd').asUrl()
    test.strictEqual(item.get(), undefined);
    test.strictEqual(item.hasError(), true);
});

metatests.testAsync("ConfigItem:#asUrl удаляет пробелы с концов", async (test) => {
    const item = new ConfigItem();
    item.default(' http://asd.ru/asd ').asUrl()
    test.strictEqual(item.get(), 'http://asd.ru/asd');
    test.strictEqual(item.hasError(), false);
});
