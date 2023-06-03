"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = process.env.PORT || 5000;
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
