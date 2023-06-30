import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
   conversationId: {
    type: String
   },
   sender: {
    type: String
   },
   text: {
    type: String
   }
  },
  { timestamps: true }
);

export const Message = model("Message", messageSchema, 'messages');

export type MessageModel = typeof Message;