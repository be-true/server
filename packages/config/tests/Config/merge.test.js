const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("Config:#merge Все поля", async (test) => {
    const config = Config.from({
        host: 'http://domain.ru',
        port: 3000,
    });
    const config2 = new Config();
    config2.param('port').default(3003);
    config2.param('host').default('http://sub.domain.ru');

    config.merge(config2);

    test.strictEqual(config.port, 3003);
    test.strictEqual(config.host, 'http://sub.domain.ru');
});

metatests.testAsync("Config:#merge Частичное", async (test) => {
    const config = Config.from({
        host: 'http://domain.ru',
        port: 3000,
    });
    config.override('host', 'http://already.domain.ru')
    const config2 = new Config();
    config2.param('port').default(3003);

    config.merge(config2);

    test.strictEqual(config.port, 3003);
    test.strictEqual(config.host, 'http://already.domain.ru');
});