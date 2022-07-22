const metatests = require("metatests");
const { Application, Command, LoggerService } = require("../lib");

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
