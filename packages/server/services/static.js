'use_strict'

const { filesInPath } = require("../../utils");
const fs = require('fs/promises');

class StaticService {
    static service() {
        return {
            name: "static",
            deps: ['logger'],
            config: {
                root: undefined,
                prefix: ''
            }
        }
    }

    #files = new Map();

    constructor({ logger }, config = StaticService.service().config) {
        this.logger = logger;
        this.config = config;
    }

    async start() {
        for await (const file of filesInPath(this.config.root)) {
            const key = file.path;
            this.#files.set(key, {
                size: file.size,
                file: file.file,
                buffer: await fs.readFile(file.path),
            })
        }
        this.logger.info([...this.#files.keys()], `Файлы загружены для url - ${this.config.prefix}`);
        return this;
    }

    async handle(url) {
        
    }
}

module.exports = {
    StaticService
}