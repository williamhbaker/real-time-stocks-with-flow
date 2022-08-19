"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http = require("http");
const routes_1 = require("./routes");
// Server serves transform lambda invocation requests, streaming source
// collection documents, processing each via the designated transform, and
// streaming resulting derived documents in response.
class Server {
    constructor(listenPath) {
        this.listenPath = listenPath;
    }
    start() {
        const server = http.createServer(this._processStream.bind(this));
        server.on('error', console.error);
        server.listen({ path: this.listenPath });
    }
    _processStream(req, resp) {
        const malformed = (msg) => {
            resp.setHeader('content-type', 'text/plain');
            resp.writeHead(400);
            resp.end(msg + '\n'); // Send message & EOF.
        };
        const path = req.url;
        if (path === undefined) {
            return malformed('expected url');
        }
        const lambda = routes_1.routes[path];
        if (lambda === undefined) {
            return malformed(`route ${path} is not defined`);
        }
        // Gather and join all data buffers.
        const chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        });
        req.on('end', () => {
            if (req.aborted) {
                return;
            }
            // Join input chunks and parse into an array of invocation rows.
            const [sources, registers] = JSON.parse(chunks.join(''));
            // Map each row into a future which will return Document[].
            const futures = sources.map(async (source, index) => {
                const previous = registers ? registers[index][0] : undefined;
                const register = registers ? registers[index][1] : undefined;
                return lambda(source, register || previous, previous);
            });
            // When all rows resolve, return the Document[][] to the caller.
            Promise.all(futures)
                .then((rows) => {
                const body = Buffer.from(JSON.stringify(rows), 'utf8');
                resp.setHeader('Content-Length', body.length);
                resp.setHeader('Content-Type', 'application/json');
                resp.writeHead(200);
                resp.end(body);
            })
                .catch((err) => {
                // Send |err| to peer, and log to console.
                resp.setHeader('content-type', 'text/plain');
                resp.writeHead(400);
                resp.end(`${err.name}: (${err.message})\n`);
                console.error(err);
            });
        });
        req.on('error', (err) => {
            console.error(err);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map