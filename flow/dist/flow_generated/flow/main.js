#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
function main() {
    if (!process.env.SOCKET_PATH) {
        throw new Error('SOCKET_PATH environment variable is required');
    }
    new server_1.Server(process.env.SOCKET_PATH).start();
    console.error('READY');
}
main();
//# sourceMappingURL=main.js.map