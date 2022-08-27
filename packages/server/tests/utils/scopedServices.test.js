const metatests = require("metatests");
const { scopedServices } = require("../../lib/utils");

metatests.testSync("scopedServices", (test) => {
    const services = [
        {
            name: 'request'
        },
        {
            name: 'logger',
            deps: ['request'],
            scope: 'request',
        },
        {
            name: 'repo',
            deps: ['logger'],
        },
        {
            name: 'postgres',
            deps: ['logger'],
            scope: 'singleton'
        },
        {
            name: 'any',
            scope: 'demand'
        }
    ]
    const scoped = scopedServices(['request'], services);
    test.strictEqual(scoped.map(i => i.name), ['request', 'logger', 'repo']);
});