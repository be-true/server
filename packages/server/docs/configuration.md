[Стек](../../../README.md) / [Библиотека](../README.md)
# Конфигурация сервисов

## Параметр конфиг
В описание [сервисов](./service.md) указан параметр `config`. Он может быть как JSON, так и экземпляром класса `Config` из библиотеки `@be-true/config`. При старте сервиса параметр `config` передается в конструктор вторым параметром и может быть использован для настройки работы сервиса.

## Пример использования

Опишем некий произвольный сервис `AnyService`, у которого есть конфигурация `AnyConfig` с обязательным параметром `level`

```javascript
const { Config } = require("@be-true/config/Config");

class AnyConfig extends Config {
    description = 'AnyService'

    constructor() {
        super();
        this.level = this.param('level')
            .required()
            .fromEnv('ANY_LEVEL')
            .description('Задает уровень взаимодействия')
            .asEnum(['low', 'middle', 'high']);
    }
}

class AnyService {
    static service() {
        return {
            name: 'any',
            config: new AnyConfig()
        }
    }

    constructor(di, config) {
        this.config = config;
    }

    async start() {
        switch(this.config.level) {
            case 'low':
                console.log('Level is LOW');
                break;
            case 'middle':
                console.log('Level is MIDDLE');
                break;
            case 'high':
                console.log('Level is HIGH');
                break;
        }
    }
}

module.exports = {
    AnyService
}
```

Так же параметр `config` может быть указан как JSON объект 

```javascript
    ...
    config: {
        level: "low"
    }
    ...
```

> Важно! Но в данном случае не будет доступна авто документация конфигурации приложения и валидация переданных параметров

## Переопределение

Настройки сервиса по умолчанию можно переопределить при подключении к приложению. 
Для этого вторым параметром указывается JSON как на примере ниже. Параметры из `config` переопределят значения конфигурации.

Также можно изменить настройки самого файла конфигурации `description`, `context`. 
Для этого нужно указать параметр `_settings`. Работу этих параметров см. библиотеку [конфигурации](../../config/README.md)

```javascript
const { Application, LoggerService } = require("@be-true/server");
const { Postgres } = require("@be-true/postgres");

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(Postgres, { 
        name: 'postgresMain', 
        config: { 
            _settings: { description: 'Основное подключение' } 
        }
    })
    .addService(Postgres, { 
        name: 'postgresSecond', 
        config: { 
            _settings: { description: 'Второе подключение', context: "SECOND" } 
        }
    })
;

module.exports = { app };
```