[На главную](../../README.md) / [к сервису](../README.md)

# Переменные окружения

[envs]: start

## <u>Logger</u>
| required | default | env          | description                                 | type                                                              |
|----------|---------|--------------|---------------------------------------------|-------------------------------------------------------------------|
|          | false   | `LOG_PRETTY` | Отображать логи в человеко понятном формате | `boolean`                                                         |
|          | info    | `LOG_LEVEL`  | Уровень отображения логов                   | `enum:trace,debug,info,warn,error,fatal,silent,10,20,30,40,50,60` |

## <u>WEB сервер</u>
| required | default   | env         | description      | type      |
|----------|-----------|-------------|------------------|-----------|
|          | 127.0.0.1 | `HTTP_HOST` | HOST WEB сервера | `string`  |
|          | 3000      | `HTTP_PORT` | Port WEB сервера | `integer` |


[envs]: end