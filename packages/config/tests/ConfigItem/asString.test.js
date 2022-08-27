const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");
const { RequiredError } = require("../../errors");

metatests.testSync("ConfigItem: asString.", (test) => {
    const item = new ConfigItem("Text").asString();
    test.strictEqual(item, "Text");
});

metatests.testSync("ConfigItem: asString. Required", (test) => {
    try {
        new ConfigItem().required().asString();
        test.strictEqual(false, true)
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true)
    }
});

metatests.testSync("ConfigItem: asString. Default", (test) => {
    const item = new ConfigItem().default("Default").asString();
    test.strictEqual(item, "Default");
});

metatests.testSync("ConfigItem: asString. Example as default", (test) => {
    const item = new ConfigItem('a');
    item.asString();
    test.strictEqual(item.export().type, "string");
});

metatests.testSync("ConfigItem: asString. Example as handle setup", (test) => {
    const item = new ConfigItem("").example("my example text");
    item.asString();
    test.strictEqual(item.export().example, "my example text");
});