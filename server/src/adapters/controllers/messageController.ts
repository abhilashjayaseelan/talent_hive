import { Request, Response } from "express";
import { MessagesInterface } from "../../types/messengerInterface";
import { MessageRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/messageRepositoryMongoDB";
import { MessageDbInterface } from "../../app/repositories/messageDbRepository.";
import { MessageModel } from "../../frameworks/database/mongoDb/models/messageModel";
import { newMessage, getMessages } from "../../app/useCases/messenger/message";
import expressAsyncHandler from "express-async-handler";

const messageController = (
    messageDbRepository: MessageDbInterface,
    messageDbRepositoryImpl: MessageRepositoryMongoDB,
    messageModel: MessageModel
) => {
    const dbRepositoryMessage = messageDbRepository(messageDbRepositoryImpl(messageModel));

    const saveMessage = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const message = req?.body ?? {};
            const messages = await newMessage(message, dbRepositoryMessage);
            res.json(messages);
        }
    )

    const getConversationMessages = expressAsyncHandler(
        async (req: Request, res: Response) => {
            const conversationId = req?.params?.conId ?? ''
            if (!conversationId) {
                throw new Error('No conversation id found');
            }
            const messages = await getMessages(conversationId, dbRepositoryMessage);
            res.json(messages);
        }
    )

    return {
        saveMessage,
        getConversationMessages
    }
}

export default messageController;