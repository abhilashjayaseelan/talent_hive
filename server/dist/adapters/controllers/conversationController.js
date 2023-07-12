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
const conversation_1 = require("../../app/useCases/messenger/conversation");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const conversationController = (conversationDbRepository, conversationDbRepositoryImpl, conversationModel) => {
    const dbRepositoryConversation = conversationDbRepository(conversationDbRepositoryImpl(conversationModel));
    const createConversation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const conversation = {
            members: [(_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.senderId, (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.receiverId],
        };
        const newCon = yield (0, conversation_1.newConversation)(conversation, dbRepositoryConversation);
        res.json(newCon);
    }));
    const findConversation = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const id = (_c = req.params.id) !== null && _c !== void 0 ? _c : '';
        if (!id) {
            throw new Error('id not found');
        }
        const conversation = yield (0, conversation_1.getConversation)(id, dbRepositoryConversation);
        res.json(conversation);
    }));
    return {
        createConversation,
        findConversation,
    };
};
exports.default = conversationController;
