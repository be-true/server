const http = require("http");

class HttpTransport {
    static service() {
        return {
            name: 'transport',
            config: {
                hostname: "127.0.0.1",
                port: 3001,
            }
        }
    }

    constructor(_, config) {
        this._config = config;
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