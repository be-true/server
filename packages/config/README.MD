# @be-true/config

Система конфигурации для nodejs с возможностью валидации и автоматической документации

## Установка
```
npm i @be-true/config --save
```

## Возможности

- Обязательность полей
- Значения по умолчанию
- Документация параметра
- Конечный тип (пример, `.asBoolean()`, `.asInteger()`, корректно работает с TS
- Массивы через разделитель с возможностью его замены
- Валидация с выводом в MD таблицу

    Пример вывода ошибки:
    ```
    ## AnyService
    | error                                | required | default | env       | description                   | type                  |
    |--------------------------------------|----------|---------|-----------|-------------------------------|-----------------------|
    | Параметр обязательный для заполнения | да       |         | ANY_LEVEL | Задает уровень взаимодействия | enum:low,middle,hight |
    ```
- Экспорт конфигурации в MD таблицу

    Пример:
    ```
    ## Logger
    | required | default | env          | description                                 | type                                                              |
    |----------|---------|--------------|---------------------------------------------|-------------------------------------------------------------------|
    |          | false   | `LOG_PRETTY` | Отображать логи в человеко понятном формате | `boolean`                                                         |
    |          | info    | `LOG_LEVEL`  | Уровень отображения логов                   | `enum:trace,debug,info,warn,error,fatal,silent,10,20,30,40,50,60` |

    ## WEB сервер
    | required | default   | env         | description      | type      |
    |----------|-----------|-------------|------------------|-----------|
    |          | 127.0.0.1 | `HTTP_HOST` | HOST WEB сервера | `url`     |
    |          | 3000      | `HTTP_PORT` | Port WEB сервера | `integer` |
    ```

## Пример файла конфигурации

JS
```javascript
const { Config } = require('@be-true/config');

const levelEnum = 'trace,debug,info,warn,error,fatal,silent,10,20,30,40,50,60'.split(',');
class LoggerConfig extends Config {
    description = 'Logger';
    constructor() {
        super();
        this.pretty = this.param('pretty')
            .default(false)
            .fromEnv('LOG_PRETTY')
            .description('Отображать логи в человеко понятном формате')
            .asBoolean();
            
        this.level = this.param('level')
            .default('info')
            .fromEnv('LOG_LEVEL')
            .description('Уровень отображения логов')
            .asEnum(levelEnum);
    }
}
```

TS
```typescript
import { Config } from '@be-true/config';

const levelEnum = 'trace,debug,info,warn,error,fatal,silent,10,20,30,40,50,60'.split(',');
class LoggerConfig extends Config {
    description = 'Logger';

    pretty = this.param('pretty')
            .default(false)
            .fromEnv('LOG_PRETTY')
            .description('Отображать логи в человеко понятном формате')
            .asBoolean();
            
    level = this.param('level')
            .default('info')
            .fromEnv('LOG_LEVEL')
            .description('Уровень отображения логов')
            .asEnum(levelEnum);
}
```

## Использование
```javascript
const config = new LoggerConfig();

// Получение значений
config.pretty; // false
const { pretty, level } = config;

// Переопределение
config.override('pretty', true);
config.pretty; // true

// Документация. Возвращает текст с таблицей описания конфигурации
const doc = config.render();

// Валидация. Возвращает текст с таблицей ошибок
const err = config.renderError();
```