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
    const result = `[INFO]:   00:00:00.000 - Test message\n` +
                   `          param: one\n` + 
                   `          param2: two`
    test.strictEqual(logger.logs[0], result);
});

metatests.testSync("Logger: level error", async (test) => {
    const logger = new LoggerTest(null, { level: 'error' });
    logger.info("Info message");
    logger.error("Error message");

    test.strictEqual(logger.logs.length, 1) 
    test.strictEqual(logger.logs[0].msg, 'Error message') 
});

metatests.testSync("Logger: level silent", async (test) => {
    const logger = new LoggerTest(null, { level: 'silent' });
    logger.info("Info message");
    logger.error("Error message");

    test.strictEqual(logger.logs.length, 0) 
});

metatests.testSync("Logger: level ERROR as upper case", async (test) => {
    const logger = new LoggerTest(null, { level: 'ERROR' });
    logger.info("Info message");
    logger.error("Error message");

    test.strictEqual(logger.logs.length, 1) 
    test.strictEqual(logger.logs[0].msg, 'Error message') 
});

metatests.testSync("Logger: default level", (test) => {
    const logger = new LoggerTest();
    logger.info("Info message");
    test.strictEqual(logger.logs.length, 1) 
});

metatests.testSync("Logger: setParams", (test) => {
    const logger = new LoggerTest();
    logger.setParams({ requestId: 123 });
    logger.info("Info message");
    test.strictEqual(logger.logs.length, 1) 
    test.strictEqual(logger.logs[0].requestId, 123) 
});
