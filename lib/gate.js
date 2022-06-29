const { Application } = require("./application");

class Gate extends Application {
    _proxyCommands = [];

    proxyCommands(appName,   commandNames) {
        for (const commandName of commandNames) {
            this._proxyCommands.push({ appName, commandName })
        }
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