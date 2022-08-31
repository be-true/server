const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("Config:#from если передан JSON", async (test) => {
    const item = Config.from({
        host: 'http://domain.ru',
        port: 3000,
    });
    test.strictEqual(item.port, 3000);
    test.strictEqual(item.host, 'http://domain.ru');
});

metatests.testAsync("Config:#from если передан class Config", async (test) => {
    const config = new Config();
    config.param('port').default(3000);
    config.param('host').default('http://domain.ru');
    const item = Config.from(config);
    test.strictEqual(item.port, 3000);
    test.strictEqual(item.host, 'http://domain.ru');
});