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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../app/useCases/messenger/message");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const messageController = (messageDbRepository, messageDbRepositoryImpl, messageModel) => {
    const dbRepositoryMessage = messageDbRepository(messageDbRepositoryImpl(messageModel));
    const saveMessage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const message = (_a = req === null || req === void 0 ? void 0 : req.body) !== null && _a !== void 0 ? _a : {};
        const messages = yield (0, message_1.newMessage)(message, dbRepositoryMessage);
        res.json(messages);
    }));
    const getConversationMessages = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        const conversationId = (_c = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.conId) !== null && _c !== void 0 ? _c : '';
        if (!conversationId) {
            throw new Error('No conversation id found');
        }
        const messages = yield (0, message_1.getMessages)(conversationId, dbRepositoryMessage);
        res.json(messages);
    }));
    return {
        saveMessage,
        getConversationMessages
    };
};
exports.default = messageController;
