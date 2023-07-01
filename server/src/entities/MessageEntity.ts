import { MessagesInterface } from "../types/messengerInterface";
import { MessageModel } from "../frameworks/database/mongoDb/models/messageModel";

export class MessagesEntity {
  public model: MessageModel;

  constructor(model: MessageModel) {
    this.model = model;
  }

  public async newMessage(
    message: MessagesInterface
  ): Promise<MessagesInterface | null> {
    const messages = await this.model.create(message);
    return messages;
  }

  public async getMessage(
    conversationId: string
  ): Promise<MessagesInterface | any> {
    const messages = await this.model.find({conversationId});
    return messages;
  }
}
