const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("Config:#merge Все поля", async (test) => {
    const config = Config.from({
        host: 'http://domain.ru',
        port: 3000,
    });
    const override = {
        'port': 3003,
        'host': 'http://sub.domain.ru'
    };
    config.merge(override);

    test.strictEqual(config.port, 3003);
    test.strictEqual(config.host, 'http://sub.domain.ru');
});

metatests.testSync("Config:#merge Частичное", (test) => {
    const config = Config.from({
        host: 'http://domain.ru',
        port: 3000,
    });
    config.override('host', 'http://already.domain.ru')

    const override = {
        port: 3003,
    };
    config.merge(override);

    test.strictEqual(config.port, 3003);
    test.strictEqual(config.host, 'http://already.domain.ru');
});

metatests.testSync("Config:#merge _settings", (test) => {
    const config = Config.from({
        host: 'http://domain.ru',
        port: 3000,
    });
    config.override('host', 'http://already.domain.ru')

    const override = {
        _settings: { description: 'Описание', context: 'DB2' },
        port: 3003,
    };
    config.merge(override);

    test.strictEqual(config.port, 3003);
    test.strictEqual(config.host, 'http://already.domain.ru');
    test.strictEqual(config.description, 'Описание');
    test.strictEqual(config.context, 'DB2');
});