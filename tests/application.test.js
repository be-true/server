const metatests = require("metatests");
const { Application } = require("../lib/application");
const { Command } = require("../lib/command");

metatests.testSync("Application: Add command", (test) => {
    const command = new Command().setCode("anyCommand").setHandler((params) => params);
    const app = new Application().addCommand(command);
    const response = app.handleCommand("anyCommand", { any: 123 })
    test.strictEqual(response.toJSON(), { 
        code: 200,
        status: "Success",
        result: { any: 123 } 
    })
});

metatests.testSync("Application: Error. Not find command", (test) => {
    const app = new Application();
    try {
        app.handleCommand("anyCommand", {})
        test.strictEqual(1, 0)
    } catch (e) {
        test.strictEqual(1, 1)
    }
});
