# Задачи:
- [ ] Сделать adapter для nats
- [ ] Добавить в response кастомные поля
- [ ] Оттестировать функцию streamToJson()
- [ ] Сверстать шаблон для чат админки + добавить пустой файл для скрипта

# Возможности:
- Минимальное использование внешних библиотек (pg/postgres, nats, s3, rabbit, redis)
- Независимость от транспорта (http, websocket, nats...)
- GateWay. Группировка API от группы серверов в один сервис
- Легкий переход от монолитной архитектуре к микросервисной
- Трассировка из коробки
- Логирование из коробки
- Фоновое выполнение задач на базе postgres, rabbitMQ как в рамках одного процесса с приложением, так и как отдельный экземпляр приложения
- Проверка данных запросов и ответов с использованием jsonSchema
- Механизм раздачи статики, позаимствованный из metarhia

# Интерфейс классов
class Application
+ addCommand(): this
+ addService(service): this
+ getCommands(): Command[]
+ handleCommand(code, params): Response
+ start(): Promise<void>

class Command
+ code;
--------------------------
+ getDescription(): string
+ getCode(): string
+ setCode(code): this
+ setHandler(handler): this
+ handle(params): void

class Response
+ result
+ code
+ status
--------------------------
+ setCode(code): this
+ setStatus(status): this
+ setResult(result): this
+ toJSON(): Object
+ toStream(): ReadableStream
