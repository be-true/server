const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");
const { RequiredError } = require("../../errors");

metatests.testSync("ConfigItem: asBoolean. 0", (test) => {
    const item = new ConfigItem("0").asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. Default false", (test) => {
    const item = new ConfigItem().default(false).asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. Required", (test) => {
    try {
        const item = new ConfigItem().required().asBoolean();
        test.strictEqual(true, false);
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true);
    }
});

metatests.testSync("ConfigItem: asBoolean. Default '0", (test) => {
    const item = new ConfigItem().default('0').asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. 1", (test) => {
    const item = new ConfigItem("1").asBoolean();
    test.strictEqual(item, true);
});

metatests.testSync("ConfigItem: asBoolean. true", (test) => {
    const item = new ConfigItem("true").asBoolean();
    test.strictEqual(item, true);
});

metatests.testSync("ConfigItem: asBoolean. false", (test) => {
    const item = new ConfigItem("false").asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. False", (test) => {
    const item = new ConfigItem("False").asBoolean();
    test.strictEqual(item, false);
});

metatests.testSync("ConfigItem: asBoolean. Example as default", (test) => {
    const item = new ConfigItem("False");
    item.asBoolean();
    test.strictEqual(item.export().type, "boolean: true, false, 0, 1");
});

metatests.testSync("ConfigItem: asBoolean. Example as handle setup", (test) => {
    const item = new ConfigItem("False").example("my example text");
    item.asBoolean();
    test.strictEqual(item.export().example, "my example text");
});