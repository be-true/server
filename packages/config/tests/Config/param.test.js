const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("ConfigItem:#param нельзя использовать имя _settings", async (test) => {
    const config = new Config();
    let result = true;
    try {
        config.param('_settings');
        result = false;
    } catch(e) {}
    test.strictEqual(result, true);
});