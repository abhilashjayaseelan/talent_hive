import express from 'express';
import connectDB from './frameworks/database/mongoDb/connection';
import http from 'http';
import routes from './frameworks/webserver/routes/routes';
import serverConfig from './frameworks/webserver/server';
import expressConfig from './frameworks/webserver/express';

const app: express.Application = express();
const server = http.createServer(app);

// connecting database
connectDB();

// calling express configuration
expressConfig(app);

// starting the server 
serverConfig(server).startServer();

// routes
routes(app);


