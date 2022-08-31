'use_strict'

const { Config } = require("../Config");

class ExampleConfig extends Config {
    constructor() {
        super();
        this.port = this.param('port')
            .description("Порт")
            .example('80')
            .default(80)
            .asInteger()
    
        this.host = this.param('host')
            .description("Url адрес")
            .example('http://example.ru/path')
            .asString()
    }
}

const config = new ExampleConfig();
console.log(config.port); // default value 80
config.override('port', 3000);
console.log(config.port); // override value 3000