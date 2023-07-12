"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_DB_URL: process.env.DATABASE,
    DB_NAME: process.env.DB_NAME,
    JWT_KEY: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    APP_SECRET: process.env.APP_SECRET,
    PORT: process.env.PORT,
    ORIGIN_PORT: process.env.ORIGIN_PORT,
    NODE_MAIL_USER: process.env.NODE_MAIL_USER_EMAIL,
    NODE_MAIL_PASS: process.env.EMAIL_PASS,
};
exports.default = configKeys;
