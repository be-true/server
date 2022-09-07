const http = require("http");
const { Config } = require('@be-true/config');

class HttpTransportConfig extends Config {
    context = 'HTTP транспорт';
    constructor() {
        super();
        this.hostname = this.param('host')
            .default('127.0.0.1')
            .fromEnv('HTTP_TRANSPORT_HOST')
            .description('HOST WEB сервера к которому идет подключение')
            .required()
            .asString();
            
        this.port = this.param('port')
            .default(3000)
            .fromEnv('HTTP_TRANSPORT_PORT')
            .description('Port WEB сервера к которому идет подключение')
            .required()
            .asInteger();
    }
}

class HttpTransport {
    static service() {
        return {
            name: 'transport',
            config: new HttpTransportConfig()
        }
    }

    constructor(_, config) {
        this._config = config ?? new HttpTransportConfig();
    }

    command(code, params, headers) {
        const { port, hostname } = this._config;
        return new Promise((suc, rej) => {
            const postData = JSON.stringify(params ?? {});

            const requestOptions = {
                hostname,
                port,
                path: '/' + code.replace(/^\/+/, ''),
                method: 'POST',
                headers: {
                    ...{
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    },
                    ...(headers ?? {})
                }
            };

            const req = http.request(requestOptions, (res) => {
                const chunks = [];
                res.on('data', (chunk) => {
                  chunks.push(chunk);
                });
                res.on('end', () => {
                  const result = JSON.parse(Buffer.concat(chunks).toString());
                  suc(result);
                });
            });
    
            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
            });
              
            // Write data to request body
            req.write(postData);
            req.end();
        });
    }
}

module.exports = {
    HttpTransport
}