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
exports.getConversation = exports.newConversation = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const newConversation = (data, dbRepositoryConversation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield dbRepositoryConversation.newConversation(data);
        return conversation;
    }
    catch (error) {
        throw new Error('Failed to create conversation');
    }
});
exports.newConversation = newConversation;
const getConversation = (id, dbRepositoryConversation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversation = yield dbRepositoryConversation.getConversation(id);
        if (!conversation) {
            throw new appError_1.default("not found any conversations", httpStatus_1.HttpStatus.NOT_FOUND);
        }
        return conversation;
    }
    catch (error) {
        throw new Error('Failed to get conversation');
    }
});
exports.getConversation = getConversation;
