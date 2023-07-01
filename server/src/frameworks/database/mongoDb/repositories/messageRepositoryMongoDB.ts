import { MessagesInterface } from "../../../../types/messengerInterface";
import { MessageModel } from "../models/messageModel";
import { MessagesEntity } from "../../../../entities/MessageEntity";

export const messageRepositoryMongoDB = (model: MessageModel) => {
    const messageEntity = new MessagesEntity(model);

    const newMessage = async (message: MessagesInterface) => {
        const newMessages = messageEntity.newMessage(message);
        return newMessages;
    }

    const getMessages = async (conversationId: string) =>{
        const messages = messageEntity.getMessage(conversationId);
        return messages;
    }

    return {
        newMessage,
        getMessages
    }
}

export type MessageRepositoryMongoDB = typeof messageRepositoryMongoDB;