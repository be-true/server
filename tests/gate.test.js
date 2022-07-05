const metatests = require("metatests");
const { Gate } = require("../lib");

metatests.testSync("Gate: proxy command", (test) => {
    const gate = new Gate().proxyCommands('game', ['load']);
    const commands = gate.getCommands().filter(c => c.code.indexOf('game') === 0);
    test.strictEqual(commands.length, 1);
    test.strictEqual(commands.map(c => c.getCode()).sort(), ['game/load']);
});
