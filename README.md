Возможности:
- Минимальное использование внешних библиотек (pg/postgres, nats, s3, rabbit, redis)
- Независимость от транспорта (http, websocket, nats...)
- GateWay. Группировка API от группы серверов в один сервис
- Легкий переход от монолитной архитектуре к микросервисной
- Трассировка из коробки
- Логирование из коробки
- Фоновое выполнение задач на базе postgres, rabbitMQ как в рамках одного процесса с приложением, так и как отдельный экземпляр приложения
- Проверка данных запросов и ответов с использованием jsonSchema
- Механизм раздачи статики, позаимствованный из метархии

class Command
+ handle(params): void
+ getName(): string
+ getDoc(): string
+ getCode(): string
+ validateParams(): Validator
+ validateResult(): Validator

class Event
+ getName(): string
+ getDoc(): string
+ getCode(): string

class Application
+ addCommand(): void
+ getCommandsInfo(): CommandInfo[]
+ handleCommand(commandCode: string, params: any): any
+ subscribeEvent(eventCode: string, (data) => any): any

ExposeDriver
+ apply(app)

