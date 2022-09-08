[На главную](../../README.md) / [к сервису](../README.md)

# Переменные окружения

[envs]: start

## <u>Logger</u>
| env        | description                                 | example | default |
|------------|---------------------------------------------|---------|---------|
| LOG_PRETTY | Отображать логи в человеко понятном формате |         | false   |
| LOG_LEVEL  | Уровень отображения логов                   |         | info    |

## <u>WEB сервер</u>
| env       | description      | example | default   |
|-----------|------------------|---------|-----------|
| HTTP_HOST | HOST WEB сервера |         | 127.0.0.1 |
| HTTP_PORT | Port WEB сервера |         | 3000      |

## <u>HTTP транспорт до сервиса GAME</u>
| env                      | description                                  | example | default   |
|--------------------------|----------------------------------------------|---------|-----------|
| GAME_HTTP_TRANSPORT_HOST | HOST WEB сервера к которому идет подключение |         | 127.0.0.1 |
| GAME_HTTP_TRANSPORT_PORT | Port WEB сервера к которому идет подключение |         | 3000      |

## <u>HTTP транспорт до сервиса CHAT</u>
| env                      | description                                  | example | default   |
|--------------------------|----------------------------------------------|---------|-----------|
| CHAT_HTTP_TRANSPORT_HOST | HOST WEB сервера к которому идет подключение |         | 127.0.0.1 |
| CHAT_HTTP_TRANSPORT_PORT | Port WEB сервера к которому идет подключение |         | 3000      |

## <u>AnyService</u>
| env       | description                   | example | default |
|-----------|-------------------------------|---------|---------|
| ANY_LEVEL | Задает уровень взаимодействия | low     |         |


[envs]: end