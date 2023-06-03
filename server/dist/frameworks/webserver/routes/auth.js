"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthControllers_1 = __importDefault(require("../../../adapters/controllers/userAuthControllers"));
const userDbRepository_1 = require("../../../app/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/userRepositoryMongoDB");
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../app/services/authServiceInterface");
const authRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, userAuthControllers_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.UserRepositoryMongoDB);
    route.post("/register", controller.userRegister);
    route.post("/login", controller.loginUser);
    return route;
};
exports.default = authRouter;
