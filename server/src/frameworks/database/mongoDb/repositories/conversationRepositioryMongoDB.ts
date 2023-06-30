import { ConversationInterface } from "../../../../types/messengerInterface";
import { ConversationModel } from "../models/conversationModel";
import { ConversationEntity } from "../../../../entities/ConversationEntity";

export const conversationRepositoryMongoDB = (model: ConversationModel) => {
    const conversationEntity = new ConversationEntity(model);

    const createConversation = async (conversation: ConversationInterface) => {
        const newConversation  = conversationEntity.newConversation(conversation);
        return newConversation;
    } 

    const getConversation = async (id: string) => {
        const conversation = conversationEntity.getConversation(id);
        return conversation;
    }

    return {
        createConversation,
        getConversation,
    }
}

export type ConversationRepositoryMongoDB = typeof conversationRepositoryMongoDB;