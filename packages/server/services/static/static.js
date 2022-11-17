'use_strict'

const { filesInPath, humanSize } = require("../../../utils");
const { Response } = require("../../response");
const { Template } = require('./template');

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
            const template = new Template(file.path, this.config.root, this.config.prefix);
            this.#files.set(template.getKey(), await template.export())
        }
        const infoSizeFiles = this.#calcSizeFiles();
        const infoSizeTotal = this.#calcSizeTotal();
        this.logger.info(infoSizeFiles, `Файлы загружены для url - ${this.config.prefix} общим размером ${infoSizeTotal}`);
        return this;
    }

    async handle(url) {
        const urls = this.#makeUrls(url);
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

    #makeUrls(url) {
        const urlFormat = ('/' + url).replace(/\/+/g, '/').replace(/\/+$/, '');
        return [urlFormat, `${urlFormat}/index.html`, `${urlFormat}/index.htm`];
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