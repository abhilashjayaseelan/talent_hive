"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
}, { timestamps: true });
exports.Message = (0, mongoose_1.model)("Message", messageSchema, 'messages');
