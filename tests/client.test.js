const metatests = require("metatests");
const { Client } = require("../lib/client");

const emptyTransport = {
    command: () => {}
}

metatests.testSync("Client: resterCommand()", (test) => {
    const client = new Client();
    client.resterCommand('app', 'commandCode', emptyTransport);
    const has = client['app'] !== undefined && client['app']['commandCode'] !== undefined;
    test.strictEqual(has, true);
});

metatests.testSync("Client: resterCommand(). Несколько команд", (test) => {
    const client = new Client();
    client.resterCommand('app', 'commandCode', emptyTransport);
    client.resterCommand('app', 'commandCode2', emptyTransport);
    const has1 = client['app'] !== undefined && client['app']['commandCode'] !== undefined;
    const has2 = client['app'] !== undefined && client['app']['commandCode2'] !== undefined;
    test.strictEqual(has1, true);
    test.strictEqual(has2, true);
});