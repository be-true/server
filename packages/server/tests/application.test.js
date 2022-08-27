const metatests = require("metatests");
const { Application, Command, LoggerService, Client } = require("../../server");
const { TransportEcho } = require("./_helpers/transport-echo");

metatests.testAsync("Application: Add command", async (test) => {
    const command = new Command().setCode("anyCommand").setHandler((params) => params);
    const app = new Application()
        .addService(LoggerService, { config: { level: 'silent' }})
        .addCommand(command);
    await app.start();
    const response = await app.handleCommand("anyCommand", { any: 123 })
    test.strictEqual(response.toJSON(), { 
        code: 200,
        status: "Success",
        result: { any: 123 } 
    })
});

metatests.testAsync("Application: Error. Not find command", async (test) => {
    const app = new Application();
    try {
        await app.handleCommand("anyCommand", {})
        test.strictEqual(1, 0)
    } catch (e) {
        test.strictEqual(1, 1)
    }
});

metatests.testAsync("Application: proxy command", async (test) => {
    const gate = new Application()
        .addService(LoggerService, { config: { level: 'silent' } })
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