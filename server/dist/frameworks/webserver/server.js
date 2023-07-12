"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const PORT = config_1.default.PORT || 5000;
const serverConfig = (server) => {
    const startServer = () => {
        server.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    };
    return {
        startServer
    };
};
exports.default = serverConfig;
