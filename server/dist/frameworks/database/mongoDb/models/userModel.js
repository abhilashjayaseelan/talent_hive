"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "please add a name"]
    },
    email: {
        type: String,
        required: [true, "please add an email"]
    },
    phone: {
        type: Number,
        required: [true, "please add a phone number"]
    },
    password: {
        type: String
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    education: {
        type: Array
    },
    skills: {
        type: Array
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        default: "user"
    },
    image: {
        type: String,
    }
});
const User = (0, mongoose_1.model)("User", userSchema, "users");
exports.default = User;
