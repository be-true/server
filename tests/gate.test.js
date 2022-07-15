const metatests = require("metatests");
const { Gate, Client } = require("../lib");
const { TransportEcho } = require("./_helpers/transport-echo");

metatests.testAsync("Gate: proxy command", async (test) => {
    const gate = new Gate()
        .addService(Client)
        .addService(TransportEcho)
        .addService(TransportEcho, { name: 'transportApp2' })
        .proxyCommands('app1', ['command1']) // Использует транспорт по умолчанию
        .proxyCommands('app2', ['command2'], { transport: 'transportApp2' }); // Использует транспорт с другим именем

    const commands = gate.getCommands().filter(c => c.code.indexOf('app1') === 0);
    test.strictEqual(commands.length, 1);
    test.strictEqual(commands.map(c => c.getCode()).sort(), ['app1/command1']);
    
    await gate.start();

    const result1 = await gate.handleCommand('app1/command1', { any: 'param1' });
    test.strictEqual(result1.toJSON(), { result: { any: 'param1' }, code: 200, status: 'Success' })

    const result2 = await gate.handleCommand('app2/command2', { any2: 'param2' });
    test.strictEqual(result2.toJSON(), { result: { any2: 'param2' }, code: 200, status: 'Success' })
});
