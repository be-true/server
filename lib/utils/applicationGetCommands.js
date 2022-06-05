const { Command } = require("../command");

class ApplicationGetCommands extends Command {
  code = "_app/getCommands";
  description = "Выводит информацию о командах зарегистрированных в приложении";

  handle(params, { app }) {
    return {
      commands: app.getCommands().map(i => ({
        code: i.getCode(),
        description: i.getDescription(),
      }))
    };
  }
}

module.exports = {
  ApplicationGetCommands,
};
