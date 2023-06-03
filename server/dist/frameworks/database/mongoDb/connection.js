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
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbOptions = {
            dbName: config_1.default.DB_NAME,
        };
        yield mongoose_1.default.connect(config_1.default.MONGO_DB_URL, dbOptions);
        console.log("Database connected...");
    }
    catch (error) {
        console.error("Database connection error", error);
        // Exiting the process or handle the error later
        process.exit(1);
    }
});
exports.default = connectDB;
