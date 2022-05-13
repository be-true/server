const metatests = require("metatests");
const { Command } = require("../lib/command");

metatests.testSync("Command: Set code", (test) => {
    const command = new Command().setCode("user/auth");
    test.strictEqual(command.getCode(), 'user/auth');
});

metatests.testSync("Command: Set code as field", (test) => {
    class Command1 extends Command {
        code = "myCode"
    }
    const command = new Command1()
    test.strictEqual(command.getCode(), 'myCode');
});

metatests.testSync("Command: Overwrite handler", (test) => {
    class Command1 extends Command {
        handle({ result }) {
            return result;
        }
    }
    const result = new Command1().handle({ result: true })
    test.strictEqual(result, true);
});

metatests.testSync("Command: Set handler", (test) => {
    const result = new Command().setHandler(({ result }) => result).handle({ result: true })
    test.strictEqual(result, true);
});

metatests.testSync("Command: Error. Empty handler", (test) => {
    class Command1 extends Command {}
    try {
        new Command1().handle({ result: true })
        test.strictEqual(1, 0);
    } catch (e) {
        test.strictEqual(1, 1);
    }
});

metatests.testSync("Command: Error. Empty code", (test) => {
    const command = new Command();
    try {
        command.handle();
        test.strictEqual(1, 0);
    } catch (e) {
        test.strictEqual(1, 1);
    }
});

