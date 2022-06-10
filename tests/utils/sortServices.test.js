const metatests = require("metatests");
const { sortServices } = require("../../lib");
const { ensureServiceWithDeps,  } = require("../ensure");

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
