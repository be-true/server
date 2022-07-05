const { Command } = require("./command");
const { Application } = require("./application");

class Gate extends Application {
    _proxyCommands = [];

    proxyCommands(appName,   commandNames) {
        for (const commandName of commandNames) {
            // Добавляем в список команд для добавления после старта
            this._proxyCommands.push({ appName, commandName })
            // Создаем команды для прокси методов
            const code = `${appName}/${commandName}`;
            const command = new Command().setCode(code).setHandler((params, { client }) => {
                return client[appName][commandName].call(params);
            });
            this.addCommand(command);
        }

        return this;
    }

    async start() {
        // Выполняем основную загрузку приложения
        await super.start();

        // Регистрируем команды для клиента, которые были указаны как прокси из других сервисов
        const { client, transport } = this._di;
        for (const [appName, commandName] of this._proxyCommands) {
            client.resterCommand(appName, commandName, transport);
        }
    }
}

module.exports = {
    Gate
}