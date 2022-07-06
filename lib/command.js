'use_strict'

class Command {
    code = "";
    description = "";
    handler;
    
    getCode() { 
        if (this.code === '') throw new Error("Необходимо указать 'code' для команды");
        return this.code;
    }

    getDescription() {
        return this.description;
    }

    setCode(code) { 
        this.code = code;
        return this; 
    }

    setHandler(handler) {
        this.handler = handler;
        return this;
    }

    handle(params, di) {
        if (this.handler !== undefined) return this.handler(params, di);
        throw new Error("Команда не имеет обработчика");
    }
}

module.exports = {
    Command
}