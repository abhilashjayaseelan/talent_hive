import express from 'express';
import conversationController from '../../../adapters/controllers/conversationController';
import { conversationDbRepository } from '../../../app/repositories/conversationDbRepository';
import { conversationRepositoryMongoDB } from '../../database/mongoDb/repositories/conversationRepositioryMongoDB';
import { Conversation } from '../../database/mongoDb/models/conversationModel';

const conversationRouter = () => {
    const route = express.Router();

    const controller = conversationController(
        conversationDbRepository,
        conversationRepositoryMongoDB,
        Conversation
    );

    route.post('/', controller.createConversation);
    route.get('/:id', controller.findConversation);

    return route;
}

export default conversationRouter;