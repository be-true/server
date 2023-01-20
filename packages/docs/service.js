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
                prefix: '/docs',
            },
        };
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

    #getCommands() {
        return this.#app.getCommands().filter((command) => !command.code.startsWith('_'));
    }

    #makeTag(code) {
        const splitted = code.split('/');
        if (splitted.length === 1) return code;
        else return splitted.slice(0, splitted.length - 1).join('');
    }

    #generateSwaggerData() {
        const paths = this.#getCommands().reduce((acc, command) => {
            const url = path.join('/', command.code);
            acc[url] = this.#generatePath(command);
            return acc;
        }, {});

        return {
            openapi: '3.0.3',
            info: {
                title: 'Документация API',
                description: 'Описание API',
                version: '1.0.0',
            },
            host: 'http://localhost:3000',
            schemes: ['http'],
            servers: [{
                url: 'http://localhost:3000/api/'
            }],
            paths,
        };
    }

    #generatePath(command) {
        const tag = this.#makeTag(command.code);
        return {
            post: {
                operationId: command.code,
                tags: [tag],
                description: '',
                requestBody: {
                    description: 'ObjectSchema',
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string', description: 'asd' },
                                },
                                required: ['name'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Успешный ответ',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        code: { type: 'number', enum: [200] },
                                        requestId: { type: 'string', description: 'ID запроса' },
                                        result: {
                                            type: 'object',
                                            schema: {
                                                type: 'object',
                                            },
                                        },
                                    },
                                    required: ['code', 'requestId', 'result'],
                                },
                            },
                        },
                    },
                    400: {
                        description: 'Ответ с ошибкой',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        code: { type: 'number', enum: [400] },
                                        requestId: { type: 'string', description: 'ID запроса' },
                                        error: { type: 'string', description: 'Код ошибки' },
                                        message: { type: 'string', description: 'Сообщение об ошибке' },
                                        detail: {
                                            type: 'object',
                                            description: 'Детальное описание ошибки',
                                            schema: {
                                                type: 'object',
                                            },
                                        },
                                    },
                                    required: ['code', 'requestId', 'error', 'message'],
                                },
                            },
                        },
                    },
                },
            },
        };
    }
}

module.exports = {
    DocsService,
};
