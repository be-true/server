'use_strict'

const { filesInPath } = require("../../utils");
const { Response } = require("../response");
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
            const key = this.makeKeyForFile(file.path);
            this.#files.set(key, {
                size: file.size,
                file: file.file,
                buffer: await fs.readFile(file.path),
            })
        }
        this.logger.info([...this.#files.keys()], `Файлы загружены для url - ${this.config.prefix}`);
        return this;
    }

    async handle(urls) {
        for (const url of urls) {
            const file = this.#files.get(url.toLowerCase());
            if (file) {
                return new Response(file.buffer);
            }
        }
    }

    makeKeyForFile(fileName) {
        const root = this.config.root.replace(/\/+$/, '');
        const file = ('/' + fileName).replace(/\/+/, '/').replace(/\/+$/, '').replace(root, '');
        const prefix = ('/' + this.config.prefix).replace(/\/+/, '/').replace(/\/+$/, '');
        return `${prefix}${file}`.toLowerCase();
    }
}

module.exports = {
    StaticService
}