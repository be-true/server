const metatests = require("metatests");
const { ConfigItem } = require("../../ConfigItem");
const { EnumNotFoundError, RequiredError } = require("../../errors");

const enumList = ["production", "develop", "localhost", "staging"];

metatests.testSync("ConfigItem: asEnum", (test) => {
    const item = new ConfigItem("production").asEnum(enumList);
    test.strictEqual(item, "production");
});

metatests.testSync("ConfigItem: asEnum. Case unsensitive", (test) => {
    const item = new ConfigItem("Production").asEnum(enumList);
    test.strictEqual(item, "production");
});

metatests.testSync("ConfigItem: asEnum. Default", (test) => {
    const item = new ConfigItem().default("localhost").asEnum(enumList);
    test.strictEqual(item, "localhost");
});

metatests.testSync("ConfigItem: asEnum. Required", (test) => {
    try {
        const item = new ConfigItem().required().asEnum(enumList);
        test.strictEqual(false, true);
    } catch(e) {
        test.strictEqual(e instanceof RequiredError, true);
    }
});

metatests.testSync("ConfigItem: asEnum. Case unsensitive", (test) => {
    try {
        const item = new ConfigItem("other").asEnum(enumList);
        test.strictEqual(false, true);
    } catch(e) {
        test.strictEqual(e instanceof EnumNotFoundError, true);
    }
});

metatests.testSync("ConfigItem: asEnum. Example as default", (test) => {
    const item = new ConfigItem(enumList[0]);
    item.asEnum(enumList);
    test.strictEqual(item.export().type, "enum: " + enumList.join(", "));
});

metatests.testSync("ConfigItem: asEnum. Example as handle setup", (test) => {
    const item = new ConfigItem(enumList[0]).example("my example text");
    item.asEnum(enumList);
    test.strictEqual(item.export().example, "my example text");
});