"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employer = void 0;
const mongoose_1 = require("mongoose");
const employerSchema = new mongoose_1.Schema({
    companyName: {
        type: String,
        required: [true, "Please add a company name"],
    },
    industry: {
        type: String,
        required: [true, "Please add the industry name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    location: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        default: "employer"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String
    }
});
exports.Employer = (0, mongoose_1.model)("Employer", employerSchema, "employers");
