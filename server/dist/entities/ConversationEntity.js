"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationEntity = void 0;
class ConversationEntity {
    constructor(model) {
        this.model = model;
    }
    newConversation(conversations) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderId = conversations === null || conversations === void 0 ? void 0 : conversations.members[0];
            const receiverId = conversations === null || conversations === void 0 ? void 0 : conversations.members[1];
            // Check if conversation already exists
            const existingConversation = yield this.model.findOne({
                members: {
                    $all: [senderId, receiverId],
                },
            });
            if (existingConversation) {
                return existingConversation;
            }
            // Create new conversation
            const newConversation = yield this.model.create(conversations);
            return newConversation;
        });
    }
    getConversation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = yield this.model
                .find({
                members: { $in: [id] },
            })
                .sort({ updatedAt: -1 });
            return conversation;
        });
    }
}
exports.ConversationEntity = ConversationEntity;
