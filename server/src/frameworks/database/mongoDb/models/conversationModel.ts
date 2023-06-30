import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export const Conversation = model("Conversation", conversationSchema, 'conversations')

export type ConversationModel = typeof Conversation;