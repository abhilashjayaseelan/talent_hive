"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = __importDefault(require("../../../adapters/controllers/messageController"));
const messageRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/messageRepositoryMongoDB");
const messageDbRepository_1 = require("../../../app/repositories/messageDbRepository.");
const messageModel_1 = require("../../database/mongoDb/models/messageModel");
const messageRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, messageController_1.default)(messageDbRepository_1.messageDbRepository, messageRepositoryMongoDB_1.messageRepositoryMongoDB, messageModel_1.Message);
    route.post('/', controller.saveMessage);
    route.get('/:conId', controller.getConversationMessages);
    return route;
};
exports.default = messageRouter;
