import {Server} from 'http';
import configKeys from '../../config';

const PORT = configKeys.PORT || 5000;

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