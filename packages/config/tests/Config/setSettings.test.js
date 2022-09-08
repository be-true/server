const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("Config:#setSettings undefined", async (test) => {
    const config = new Config();
    config.setSettings();
    test.strictEqual(config.description, '');
    test.strictEqual(config.context, '');
});

metatests.testAsync("Config:#setSettings all", async (test) => {
    const config = new Config();
    config.setSettings({ description: 'Описание', context: 'DB2' });
    test.strictEqual(config.description, 'Описание');
    test.strictEqual(config.context, 'DB2');
});