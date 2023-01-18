'use_strict'

const { filesInPath, humanSize } = require("@be-true/utils");
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
            this.registerFile(template.getKey(), await template.export());
        }
        const infoSizeFiles = this.#calcSizeFiles();
        const infoSizeTotal = this.#calcSizeTotal();
        this.logger.info(infoSizeFiles, `Файлы загружены для url - ${this.config.prefix} общим размером ${infoSizeTotal}`);
        return this;
    }

    registerFile(key, data) {
        this.#files.set(key, data);
    }

    async handle(url) {
        const urls = this.#extendUrl(url);
        for (const url of urls) {
            const file = this.#files.get(url.toLowerCase());
            if (file) {
                return new Response(file.buffer).setHeaders({
                    'Content-Length': file.size,
                    'Content-Type': file.mime,
                });
            }
        }
    }

    #extendUrl(url) {
        const urlFormat = ('/' + url).replace(/\/+/g, '/').replace(/\/+$/, '');
        return [urlFormat, `${urlFormat}/index.html`, `${urlFormat}/index.htm`];
    }

    #calcSizeTotal() {
        let total = 0;
        for (const { size } of this.#files.values()) {
            total += size;
        }
        return humanSize(total);
    }

    #calcSizeFiles() {
        const nameToSize = {};
        for (const [file, { size }] of this.#files) {
            nameToSize[file] = `${humanSize(size)}`;
        }
        return nameToSize;
    }
}

module.exports = {
    StaticService
}