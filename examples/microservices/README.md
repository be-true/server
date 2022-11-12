# Пример микросервисной архитектуры

- [Gateway](./gate/README.md)
- [Game](./game/README.md)
- [Chat](./chat/README.md)

# Тестовые команды
- Вызов метода load у сервиса chat через Gate:
curl -X POST -d {} -v http://127.0.0.1:3000/api/game/load --header "x-trace-id: 8e27958f-0910-4b3e-a912-0d0f91848241"

