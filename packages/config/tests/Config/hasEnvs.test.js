const metatests = require("metatests");
const { Config } = require("../../Config");

metatests.testAsync("Config:#hasEnvs нет переменных окружения", async (test) => {
    const config = new Config();
    config.param('age').required().asInteger();
    config.param('about').asString();
    test.strictEqual(config.hasEnvs(), false);
});

metatests.testAsync("Config:#hasEnvs есть переменных окружения", async (test) => {
    const config = new Config();
    config.param('age').fromEnv('ENV_TEST').required().asInteger();
    config.param('about').asString();
    test.strictEqual(config.hasEnvs(), true);
});