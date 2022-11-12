const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");

metatests.testAsync("ConfigItem:#export required", async (test) => {
    const item1 = new ConfigItem().required().default('http://domain.ru');
    const item2 = new ConfigItem().default(3000);
    
    test.strictEqual(item1.export().required, true);
    test.strictEqual(item2.export().required, false);
});

metatests.testAsync("ConfigItem:#export type", async (test) => {
    const tests = [
        [ (item) => item.asEnum(['one', 'two']), 'enum:one,two' ],
        [ (item) => item.asString(), 'string' ],
        [ (item) => item.asInteger(), 'integer' ],
        [ (item) => item.asUrl(), 'url' ],
        [ (item) => item.asBoolean(), 'boolean' ],
    ];
    
    for (const [create, result] of tests) {
        const item = new ConfigItem();
        create(item);
        test.strictEqual(item.export().type, result);
    }
});