const { AuthCommand } = require("./commands/auth");
const { TestCommand } = require("./commands/test");
const { Application } = require("./lib");

const app = new Application()
    .addCommand(new AuthCommand())
    .addCommand(new TestCommand())
;

module.exports = {
    app
}