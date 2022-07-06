const metatests = require("metatests");
const { Gate, Client } = require("../lib");

class TransportEcho {
    static service() {
        return {
            name: 'transport',
        }
    }

    async command(code, params, options) {
        return params;
    }
}

metatests.testAsync("Gate: proxy command", async (test) => {
    const gate = new Gate()
        .addService(TransportEcho)
        .addService(Client)
        .proxyCommands('game', ['load']);

    const commands = gate.getCommands().filter(c => c.code.indexOf('game') === 0);
    test.strictEqual(commands.length, 1);
    test.strictEqual(commands.map(c => c.getCode()).sort(), ['game/load']);
    
    await gate.start();
    const result = await gate.handleCommand('game/load', { any: 'param' });
    test.strictEqual(result.toJSON(), { result: { any: 'param' }, code: 200, status: 'Success' })
});
