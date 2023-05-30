import {Server} from 'http';

const PORT = process.env.PORT || 5000;

const serverConfig = (server: Server) => {
    const startServer = () => {
        server.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        })
    }
    return {
        startServer
    }
}

export default serverConfig;