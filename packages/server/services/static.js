'use_strict'

const { filesInPath, mime, humanSize } = require("../../utils");
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
            const key = this.#makeKeyForFile(file.path);
            const ext = file.file.split(".").slice(-1)[0];
            this.#files.set(key, {
                size: file.size,
                file: file.file,
                buffer: await fs.readFile(file.path),
                ext,
                mime: mime(ext),
            })
        }

        const infoSizeFiles = this.#calcSizeFiles();
        const infoSizeTotal = this.#calcSizeTotal();
        this.logger.info(infoSizeFiles, `Файлы загружены для url - ${this.config.prefix} общим размером ${infoSizeTotal}`);
        return this;
    }

    async handle(urls) {
        for (const url of urls) {
            const file = this.#files.get(url.toLowerCase());
            if (file) {
                const response = new Response(file.buffer).setHeaders({
                    'Content-Length': file.size,
                });
                if (file.mime) response.setHeader('Content-Type', file.mime)
                return response;
            }
        }
    }

    #makeKeyForFile(fileName) {
        const root = this.config.root.replace(/\/+$/, '');
        const file = ('/' + fileName).replace(/\/+/, '/').replace(/\/+$/, '').replace(root, '');
        const prefix = ('/' + this.config.prefix).replace(/\/+/, '/').replace(/\/+$/, '');
        return `${prefix}${file}`.toLowerCase();
    }

    #calcSizeTotal() {
        let result = 0;
        for (const { size } of this.#files.values()) {
            result += size;
        }
        return humanSize(result);
    }

    #calcSizeFiles() {
        const result = {};
        for (const [file, { size }] of this.#files) {
            result[file] = `${humanSize(size)}`;
        }
        return result;
    }
}

module.exports = {
    StaticService
}