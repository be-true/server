# @be-true

## Документация
- [Библиотека конфигурации](./packages/config/README.md)
- [Сервер приложения](./packages/server/README.md)
    - Приложение
    - [Сервисы](./packages/server/docs/service.md)
    - [Конфигурация. Использование](./packages/server/docs/configuration.md)
    - [Конфигурация. Экспорт и валидация](./packages/server/docs/configuration-validate-and-docs.md)
    - Раздача статических файлов
        * Добавить name сервиса в префикс сообщения logger-а
        * Генерация файлов по шаблону, кастомные функции:
            - Обработать граничные случаи когда функция в шаблоне не уместилась вся
            - Описать документацию
        * Multi instance сервисов без редактировании имени
    - DI. Управление зависимостями
    - Команды. 
    - Response. Ответ выполненной команды
    - Адаптеры
    - Client. Вызов внешних сервисов
    - Транспорт
    - Логи
- WebSocket (WS)
    - Адаптер для WS

# Что нужно сделать для MVP
- Авторизация
- Валидация схемы JSON-ов на входе и выходе
- Загрузка файлов
    - Добавить командам поддержку принятие не только параметров, но и stream-а
- Обработка ошибок.
    - Создать стандартный перечень ошибок
    - Добавить их обработку
- Работа с базой данных
    - Подключение к PostgreSQL
    - Выполнение миграций
- Вывод документации Swagger
    - Раздача статики
    - Генерация самой swagger.json пока без схем
- Восстановить работоспособность монолита

# Работа с WebSocket-ами:
- Запустить пример с микросервисной архитектурой с несколькими экземплярами (Возможно через Docker Swarm, но не обязательно)
- Поднять nats для передачи событий в WSAdapter
- Написать сервис, который подключается к NATS
- Написать адаптер для получения вызовов через NATS
- Расширить работу WSAdapter методами для отправки сообщений клиентам по параметрам
- Написать сервис, который из очереди сообщений будет получать события и вызывать метод отправки сообщений в WSAdapter
- Реализовать механизм отправки Event-а в очередь
- Сделать тестовый фронт. Чат

# Цели:
- Минимальное использование внешних библиотек (pg/postgres, nats, s3, rabbit, redis)
- Независимость от транспорта (http, websocket, nats...)
- GateWay. Группировка API от группы серверов в один сервис
- Легкий переход от монолитной архитектуре к микросервисной
- Трассировка из коробки https://opentelemetry.io/
  Книга по трассировке - https://www.packtpub.com/product/mastering-distributed-tracing/9781788628464
- Логирование из коробки
- Фоновое выполнение задач на базе nats, postgres как в рамках одного процесса с приложением, так и как отдельный экземпляр приложения (демона)
- Проверка данных запросов и ответов с использованием jsonSchema
- Механизм раздачи статики, позаимствованный из metarhia
