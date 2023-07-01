import express from 'express';
import messageController from '../../../adapters/controllers/messageController';
import { messageRepositoryMongoDB } from '../../database/mongoDb/repositories/messageRepositoryMongoDB';
import { messageDbRepository } from '../../../app/repositories/messageDbRepository.';
import { Message } from '../../database/mongoDb/models/messageModel';



const messageRouter = () => {
    const route = express.Router();

    const controller = messageController(
        messageDbRepository,
        messageRepositoryMongoDB,
        Message
    );

    route.post('/', controller.saveMessage);
    route.get('/:conId', controller.getConversationMessages);

    return route;
}

export default messageRouter;