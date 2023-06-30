import { ConversationInterface } from "../types/messengerInterface";
import { ConversationModel } from "../frameworks/database/mongoDb/models/conversationModel";

export class ConversationEntity {
  public model: ConversationModel;

  constructor(model: ConversationModel) {
    this.model = model;
  }

  public async newConversation(
    conversations: ConversationInterface
  ): Promise<ConversationInterface | null> {
    const conversation = await this.model.create(conversations);
    return conversation;
  }

  public async getConversation(
    id: string
  ): Promise<ConversationInterface | any> {
    const conversation = await this.model.find({
      members: { $in: [id] },
    });
    return conversation;
  }
}
