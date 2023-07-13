
export interface ConversationInterface {
    members: Array<string>;
}

export interface MessagesInterface {
    conversationId?: string,
    sender?: string,
    text?: string
}