"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversationController_1 = __importDefault(require("../../../adapters/controllers/conversationController"));
const conversationDbRepository_1 = require("../../../app/repositories/conversationDbRepository");
const conversationRepositioryMongoDB_1 = require("../../database/mongoDb/repositories/conversationRepositioryMongoDB");
const conversationModel_1 = require("../../database/mongoDb/models/conversationModel");
const conversationRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, conversationController_1.default)(conversationDbRepository_1.conversationDbRepository, conversationRepositioryMongoDB_1.conversationRepositoryMongoDB, conversationModel_1.Conversation);
    route.post('/', controller.createConversation);
    route.get('/:id', controller.findConversation);
    return route;
};
exports.default = conversationRouter;
