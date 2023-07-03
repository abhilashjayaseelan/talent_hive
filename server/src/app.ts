import express, { NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'


import connectDB from './frameworks/database/mongoDb/connection';
import errorHandlingMiddleware from './frameworks/webserver/middleware/errorHandlingMiddleware';
import routes from './frameworks/webserver/routes/routes';
import expressConfig from './frameworks/webserver/express';
import serverConfig from './frameworks/webserver/server';
import socketConfig from './frameworks/websocket/socket';
import AppError from './utils/appError';
import configKeys from './config';

const app: express.Application = express();
const server = http.createServer(app);

app.use(cors())
// socket connection
const io = new Server(server, {
    cors: {
      origin: configKeys.ORIGIN_PORT
    }
  });


socketConfig(io);

// connecting database
connectDB();

// calling express configuration
expressConfig(app);


// starting the server 
serverConfig(server).startServer();

// routes
routes(app);

// catch 404 and forwarding to error handler
app.use(errorHandlingMiddleware) 

app.all('*', (req,res,next:NextFunction) => {
    next(new AppError('Not found', 404));
});


