const metatests = require("metatests");
const { sortServices } = require("../../lib/utils");
const { ensureServiceWithDeps } = require("../_fixtures/ensure");

metatests.testSync("sortServices: Without deps. By alphabet ASC", (test) => {
    const services = [
        ensureServiceWithDeps("B"),
        ensureServiceWithDeps("A"),
    ];
    const sorted = sortServices(services).map(i => i.name);
    test.strictEqual(['A', 'B'], sorted);
});

metatests.testSync("sortServices: With deps", (test) => {
    const services = [
        ensureServiceWithDeps("C", ["B", "A"]),
        ensureServiceWithDeps("A", ["B"]),
        ensureServiceWithDeps("B"),
    ];
    const sorted = sortServices(services).map(i => i.name);
    test.strictEqual(['B', 'A', 'C'], sorted);
});

metatests.testSync("sortServices: With deps 2", (test) => {
    const services = [
        ensureServiceWithDeps("logger"),
        ensureServiceWithDeps("http", ["logger"]),
        ensureServiceWithDeps("httpAdapter", ["http"]),
        ensureServiceWithDeps("wsAdapter", ["http", "logger"]),
    ];
    const sorted = sortServices(services).map(i => i.name);
    test.strictEqual(['logger', 'http', 'httpAdapter', 'wsAdapter'], sorted);
});
