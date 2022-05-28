
'use_strict'
class Command {
    code = "";
    handler;
    
    getCode() { 
        if (this.code === '') throw new Error("Необходимо указать 'code' для команды");
        return this.code;
    }

    setCode(code) { 
        this.code = code;
        return this; 
    }

    setHandler(handler) {
        this.handler = handler;
        return this;
    }

    handle(params) {
        if (this.handler !== undefined) return this.handler(params);
        throw new Error("Команда не имеет обработчика");
    }
}

module.exports = {
    Command
}