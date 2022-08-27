const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");
const { FormatError, RequiredError } = require("../../errors");

metatests.testSync("ConfigItem: asInteger", (test) => {
    const item = new ConfigItem("1").asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. With space", (test) => {
    const item = new ConfigItem(" 1 ").asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. Negative", (test) => {
    const item = new ConfigItem("-1").asInteger();
    test.strictEqual(item, -1);
});

metatests.testSync("ConfigItem: asInteger. Default value", (test) => {
    const item = new ConfigItem().default(1).asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. Required with default", (test) => {
    const item = new ConfigItem().required().default(1).asInteger();
    test.strictEqual(item, 1);
});

metatests.testSync("ConfigItem: asInteger. Parse error", (test) => {
    try {
        new ConfigItem("a").asInteger();
    } catch(e) {
        test.strictEqual(e instanceof FormatError, true);
    }
});

metatests.testSync("ConfigItem: asInteger. Required", (test) => {
    try {
        new ConfigItem().required().asInteger();
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true);
    }
});

metatests.testSync("ConfigItem: asInteger. Example as default", (test) => {
    const item = new ConfigItem();
    item.asInteger();
    test.strictEqual(item.export().type, "integer");
});

metatests.testSync("ConfigItem: asInteger. Example as handle setup", (test) => {
    const item = new ConfigItem().example("my example text");
    item.asInteger();
    test.strictEqual(item.export().example, "my example text");
});