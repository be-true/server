'use_strict'

const path = require("path");
const fs = require('fs');
const stream = require('stream');
const util = require('util');

const { Transform } = require('./transform');
const { mime } = require("@be-true/utils");
const pipeline = util.promisify(stream.pipeline);

class Template {
    #root;
    #prefix;
    #pathTemplate;
    #path;

    constructor(path, root, prefix) {
        this.#root = root;
        this.#prefix = prefix;
        this.#pathTemplate = path;
        this.#path = path;
        if (this.#isTemplate()) {
            this.#path = path.replace('.tmpl', '');
        }
    }

    getKey() {
        const relative = path.relative(this.#root, this.#path);
        return path.join(this.#prefix, relative).toLowerCase();
    }

    #isTemplate() {
        return this.#pathTemplate.indexOf('.tmpl.') !== -1;
    }

    #getFile() {
        return path.basename(this.#path);
    }

    #getExt() {
        return path.extname(this.#path);
    }

    async #readFile() {
        return fs.promises.readFile(this.#path);
    }

    async #build() {
        const read = fs.createReadStream(this.#pathTemplate, 'utf8');
        const transform = new Transform().setConfig({
            path: this.#path,
            root: this.#root,
            prefix: this.#prefix,
        });
        const write = fs.createWriteStream(this.#path, 'utf8');
        await pipeline(read, transform, write);
    }

    async export() {
        if (this.#isTemplate()) await this.#build();
        const stat = await fs.promises.lstat(this.#path);
        return {
            size: stat.size,
            file: this.#getFile(),
            ext: this.#getExt(),
            mime: mime(this.#getExt()),
            buffer: await this.#readFile(),
        };
    }
}

module.exports = {
    Template
}