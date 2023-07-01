import { MessagesInterface } from "../../../types/messengerInterface";
import { MessageDbInterface } from "../../repositories/messageDbRepository.";   

export const newMessage = async (
    message: MessagesInterface,
    dbRepositoryMessage: ReturnType<MessageDbInterface>
) => {
    try {
        const messages = await dbRepositoryMessage.newMessage(message);
        return messages;
    } catch (error) {
        throw new Error('Failed to create message');
    }
}

export const getMessages = async (
    conversationId: string,
    dbRepositoryMessage: ReturnType<MessageDbInterface>
) => {
    try {
        const messages = await dbRepositoryMessage.getMessages(conversationId);
        return messages;
    } catch (error) {
        throw new Error('Failed to get the conversation');
    }
}