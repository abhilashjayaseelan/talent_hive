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
    const senderId: string | any = conversations?.members[0] ;
    const receiverId: string | any = conversations?.members[1] ;

    // Check if conversation already exists
    const existingConversation = await this.model.findOne({
      members: {
        $all: [senderId, receiverId],
      },
    });

    if (existingConversation) {
      return existingConversation;
    }
    // Create new conversation
    const newConversation = await this.model.create(conversations);
    return newConversation;
  }

  public async getConversation(
    id: string
  ): Promise<ConversationInterface | any> {
    const conversation = await this.model
      .find({
        members: { $in: [id] },
      })
      .sort({ updatedAt: -1 });
    return conversation;
  }
}
