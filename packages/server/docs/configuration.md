[Стек](../../../README.md) / [сервер](../README.md)
# Конфигурация сервисов

## Параметр config
В описание [сервисов](./service.md) указан параметр `config`. Он может быть как JSON, так и экземпляром класса `Config` из библиотеки `@be-true/config`. При старте сервиса параметр `config` передается в конструктор вторым параметром и может быть использован для настройки работы сервиса.

## Пример использования

Опишем некий произвольный сервис `AnyService`, у которого есть конфигурация `AnyConfig` с обязательным параметром `level`

```javascript
const { Config } = require("@be-true/config");

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

> Важно! При передачи простого JSON в качестве конфигурации не будет доступна его авто документация и валидация.

## Переопределение

Если у сервиса указан параметр `config`, но необходимо частично его изменить, то это можно сделать при подключении сервиса к приложению. 
Для этого при добавления сервиса вторым параметром указывается JSON полей, которые нужно переопределить.

Также можно изменить настройки самого файла конфигурации: `description`, `context` (см. библиотека [конфигурации](../../config/README.md)). 
Для этого используйте поле `_settings` для указания в нем этих параметров.

```javascript
const { Application, LoggerService } = require("@be-true/server");
const { Postgres } = require("@be-true/postgres");

const app = new Application()
    .addService(LoggerService, { config: { pretty: true } })
    .addService(Postgres, { 
        name: 'postgresMain', 
        config: { 
            _settings: { description: 'Основное подключение' },
            port: 5432,
        }
    })
    .addService(Postgres, { 
        name: 'postgresSecond', 
        config: { 
            _settings: { description: 'Второе подключение', context: "SECOND" },
            port: 6432,
        }
    })
;

module.exports = { app };
```