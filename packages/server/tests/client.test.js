const metatests = require("metatests");
const { Client } = require("../client");

const emptyTransport = {
    command: () => {}
}

metatests.testSync("Client: resetterCommand()", (test) => {
    const client = new Client();
    client.resetterCommand('app', 'commandCode', emptyTransport);
    const has = client['app'] !== undefined && client['app']['commandCode'] !== undefined;
    test.strictEqual(has, true);
});

metatests.testSync("Client: resetterCommand(). Несколько команд", (test) => {
    const client = new Client();
    client.resetterCommand('app', 'commandCode', emptyTransport);
    client.resetterCommand('app', 'commandCode2', emptyTransport);
    const has1 = client['app'] !== undefined && client['app']['commandCode'] !== undefined;
    const has2 = client['app'] !== undefined && client['app']['commandCode2'] !== undefined;
    test.strictEqual(has1, true);
    test.strictEqual(has2, true);
});