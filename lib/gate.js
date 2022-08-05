const { Command } = require("./command");
const { Application } = require("./application");

class Gate extends Application {
    _proxyCommands = [];

    proxyCommands(appName, commandNames, options) {
        for (const commandName of commandNames) {
            // Добавляем в список команд для добавления после старта
            this._proxyCommands.push({ appName, commandName, options: { transport: 'transport', ...options }});
            // Создаем команды для прокси методов
            const code = `${appName}/${commandName}`;
            const command = new Command().setCode(code).setHandler((params, { client }, headers) => {
                return client[appName][commandName](params, headers);
            });
            this.addCommand(command);
        }

        return this;
    }

    async start() {
        // Выполняем основную загрузку приложения
        await super.start();

        // Регистрируем команды для клиента, которые были указаны как прокси из других сервисов
        const client = this.di.get('client');
        for (const {appName, commandName, options} of this._proxyCommands) {
            const transport = this.di.get(options.transport);
            client.resetterCommand(appName, commandName, transport);
        }
    }
}

module.exports = {
    Gate
}