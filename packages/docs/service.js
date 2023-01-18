const path = require('path');
const { StaticService } = require('@be-true/server');

class DocsService extends StaticService {
    #app;

    static service() {
        return {
            ...StaticService.service(),
            name: 'docs',
            config: {
                root: __dirname + '/static',
                prefix: '/docs'
            }
        }
    }

    constructor(di, config) {
        super(di, config);
        const { app } = di;
        this.#app = app;
    }

    async start() {
        const key = path.join(this.config.prefix, '/swagger.json');
        const swagger = this.#generateSwaggerData();
        const buffer = Buffer.from(JSON.stringify(swagger));
        this.registerFile(key, {
            size: Buffer.byteLength(buffer),
            file: 'swagger.json',
            ext: 'json',
            mime: 'application/json',
            buffer,
        });
        
        await super.start();

        return this;
    }

    #generateSwaggerData() {
        const paths = this.#app.getCommands().reduce((acc, command) => (acc[command.code] = this.#generatePath(command), acc), {});
        
        return {
            swagger: "2.0",
            info: {
                title: "Документация API",
                description: "Описание API",
                version: "1.0.0",
            },
            host: "http://localhost:3000",
            basePath: "/api",
            tags: [
                {
                    name: "pet",
                    description: "Животные",
                }
            ],
            schemes: [ "http" ],
            paths
        }
    }

    #generatePath(command) {
        return {
            "post": {
              "tags": [
                "pet"
              ],
              "description": "",
              "operationId": command.code,
              "produces": [
                "application/json"
              ],
              "parameters": [
                {
                  "name": "petId",
                  "in": "path",
                  "description": "ID of pet to update",
                  "required": true,
                  "type": "integer",
                  "format": "int64"
                },
              ],
              "responses": {
                "200": {
                  "description": "successful operation",
                }
              },
              "security": [
                {
                  "petstore_auth": [
                    "write:pets",
                    "read:pets"
                  ]
                }
              ]
            }
        };
    }

}

module.exports = {
    DocsService
}