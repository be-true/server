const http = require("http");

class HttpTransport {
    static service() {
        return {
            name: 'transport',
        }
    }

    constructor() {
        this.options = {
            hostname: "127.0.0.1",
            port: 3001,
        }
    }

    command(code, params, options) {
        return new Promise((suc, rej) => {
            const postData = JSON.stringify(params ?? {});

            const requestOptions = {
                hostname: this.options.hostname,
                port: this.options.port,
                path: '/' + code.replace(/^\/+/, ''),
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Content-Length': Buffer.byteLength(postData)
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