"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDb/connection"));
const http_1 = __importDefault(require("http"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes/routes"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// connecting database
(0, connection_1.default)();
// calling express configuration
(0, express_2.default)(app);
// starting the server 
(0, server_1.default)(server).startServer();
// routes
(0, routes_1.default)(app);
