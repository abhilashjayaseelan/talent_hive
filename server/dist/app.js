"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./frameworks/database/mongoDb/connection"));
const errorHandlingMiddleware_1 = __importDefault(require("./frameworks/webserver/middleware/errorHandlingMiddleware"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes/routes"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const socket_1 = __importDefault(require("./frameworks/websocket/socket"));
const appError_1 = __importDefault(require("./utils/appError"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)());
// socket connection
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.default.ORIGIN_PORT
    }
});
(0, socket_1.default)(io);
// connecting database
(0, connection_1.default)();
// calling express configuration
(0, express_2.default)(app);
// starting the server 
(0, server_1.default)(server).startServer();
// routes
(0, routes_1.default)(app);
// catch 404 and forwarding to error handler
app.use(errorHandlingMiddleware_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
