# Задачи:
- [ ] Создание контекста в di для каждого запроса
- [ ] Пробрасывать параметр x-trace-id

# Возможности:
- Минимальное использование внешних библиотек (pg/postgres, nats, s3, rabbit, redis)
- Независимость от транспорта (http, websocket, nats...)
- GateWay. Группировка API от группы серверов в один сервис
- Легкий переход от монолитной архитектуре к микросервисной
- Трассировка из коробки https://opentelemetry.io/
- Логирование из коробки
- Фоновое выполнение задач на базе nats, postgres как в рамках одного процесса с приложением, так и как отдельный экземпляр приложения (демона)
- Проверка данных запросов и ответов с использованием jsonSchema
- Механизм раздачи статики, позаимствованный из metarhia

# Интерфейс классов
class Application
+ addCommand(command): this
+ addService(service): this
+ getCommands(): Command[]
+ handleCommand(code, params): Response
+ start(): Promise<void>

class Gate extends Application
+ proxyCommands(appName, commandNames): this

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

class Client
+ app(appName): ClientApplication;
+ command(code, transport): (params, options) => Promise<Response<any>>
+ stream(code, transport): (stream, params, options) => Promise<Response<any>>
+ start(): Promise<Client>
+ stop(): Promise<void>

class ClientApplication
+ command(code): (params, options) => Promise<Response<any>>
+ stream(code): (stream, params, options) => Promise<Response<any>>

interface ITransport
+ command(code, params, options)
+ stream(code, stream, params, options)
