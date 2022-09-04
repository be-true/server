const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("Config:#hasError нет ошибок", async (test) => {
    const config = new Config();
    config.param('age').required().asInteger();
    config.param('about').asString();

    test.strictEqual(config.hasErrors(), true);
});