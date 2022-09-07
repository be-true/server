const { Config } = require("@be-true/config/Config");

class AnyConfig extends Config {
    context = 'AnyService'
    constructor() {
        super();
        this.level = this.param('level')
            .fromEnv('ANY_LEVEL')
            .description('Задает уровень взаимодействия')
            .example('low')
            .required()
            .asEnum(['low', 'middle', 'hight']);
    }
}

class AnyService {
    static service() {
        return {
            name: 'any',
            config: new AnyConfig()
        }
    }
}

module.exports = {
    AnyService
}