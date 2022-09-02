import { Config } from "../types/config";

class ExampleConfig extends Config {
    port = this.param('port')
        .description("Порт")
        .example('80')
        .default(80)
        .asInteger()

    host = this.param('port')
        .description("Url адрес")
        .example('http://example.ru/path')
        .asString()

    level = this.param('level')
        .description("Уровень логирования")
        .example('warn')
        .asEnum(['warn', 'error'])
}

const config = new ExampleConfig();
console.log(config.port); // default value 80
config.override('port', 3000);
console.log(config.port); // override value 3000