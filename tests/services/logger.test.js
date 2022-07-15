const metatests = require("metatests");
const { LoggerTest } = require("../_helpers/logger-test");

const time = "2022-01-01T00:00:00.000Z";

metatests.testSync("Logger: Info", async (test) => {
    const logger = new LoggerTest();
    logger.info("test");
    test.strictEqual(logger.logs, [{ time, level: 30, msg: "test" }]);
});

metatests.testSync("Logger: Info with addition params", async (test) => {
    const logger = new LoggerTest();
    logger.info({ param: 'any param' }, "test123");
    test.strictEqual(logger.logs, [{ time, level: 30, param: 'any param', msg: "test123" }]);
});

metatests.testSync("Logger: pretty", async (test) => {
    const logger = new LoggerTest(null, { pretty: true });
    logger.info({ param: 'one', param2: 'two' }, "Test message");
    const result = `[INFO]:   2022-01-01T00:00:00.000Z - Test message\n` +
                   `          param: one\n` + 
                   `          param2: two`
    test.strictEqual(logger.logs[0], result);
});
