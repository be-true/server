'use_strict'

const { Config } = require("../Config");

class ExampleConfig extends Config {
    constructor() {
        super();
        this.port = this.param('port')
            .fromEnv('HTTP_PORT')
            .description("Порт")
            .example('80')
            .default(80)
            .asInteger()
    
        this.host = this.param('host')
            .fromEnv('HTTP_HOST')
            .description("Url адрес")
            .example('http://example.ru/path')
            .asString()

        this.level = this.param('level')
            .fromEnv('LOGGER_LEVEL')
            .description("Уровень логирования")
            .example('warn')
            .asEnum(['warn', 'error'])
    }
}

const config = new ExampleConfig();
console.log(config.port); // default value 80
config.override('port', 3000);
config.override('level', 'warn');
console.log(config.port); // override value 3000
const { port, host, level } = config;
console.log(port, host, level);