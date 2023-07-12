"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
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
        required: false
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
    },
    about: {
        type: String,
    },
    profession: {
        type: String,
    },
    resume: {
        type: String,
    },
    location: {
        type: String
    },
    experience: {
        type: Object
    }
});
exports.User = (0, mongoose_1.model)("User", userSchema, "users");
