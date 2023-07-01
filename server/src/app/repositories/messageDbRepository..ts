import { MessagesInterface } from "../../types/messengerInterface";
import { MessageRepositoryMongoDB } from "../../frameworks/database/mongoDb/repositories/messageRepositoryMongoDB";

export const messageDbRepository = (
    repository: ReturnType<MessageRepositoryMongoDB>
) => {
    const newMessage = async (message: MessagesInterface) => {
        const messages = await repository.newMessage(message);
        return messages;
    }

    const getMessages = async (conversationId: string) => {
        const messages = await repository.getMessages(conversationId);
        return messages;
    }

    return {
        newMessage,
        getMessages
    }
}

export type MessageDbInterface = typeof messageDbRepository;