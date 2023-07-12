"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    members: {
        type: Array,
    },
}, { timestamps: true });
exports.Conversation = (0, mongoose_1.model)("Conversation", conversationSchema, 'conversations');
