# @be-true Стек

- Конфигурация
    - [Описание библиотеки](./packages/config/README.md)
    - [Использование с сервером приложения](./packages/server/docs/configuration.md)
- Сервер приложения
    - [Сервисы](./packages/server/docs/service.md)

# Что нужно сделать для MVP
- Конфигурация через envs с использованием библиотеки  @be-true/config
    - Документация для библиотеки конфигурации
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

# Возможности:
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
