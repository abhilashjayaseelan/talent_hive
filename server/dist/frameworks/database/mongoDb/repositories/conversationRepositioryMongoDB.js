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
exports.conversationRepositoryMongoDB = void 0;
const ConversationEntity_1 = require("../../../../entities/ConversationEntity");
const conversationRepositoryMongoDB = (model) => {
    const conversationEntity = new ConversationEntity_1.ConversationEntity(model);
    const createConversation = (conversation) => __awaiter(void 0, void 0, void 0, function* () {
        const newConversation = conversationEntity.newConversation(conversation);
        return newConversation;
    });
    const getConversation = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const conversation = conversationEntity.getConversation(id);
        return conversation;
    });
    return {
        createConversation,
        getConversation,
    };
};
exports.conversationRepositoryMongoDB = conversationRepositoryMongoDB;
