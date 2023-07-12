"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../../../adapters/controllers/userControllers"));
const userDbRepository_1 = require("../../../app/repositories/userDbRepository");
const userRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/userRepositoryMongoDB");
const userModel_1 = require("../../database/mongoDb/models/userModel");
const multerCloudinary_1 = require("../middleware/multerCloudinary");
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const userMiddleware = (0, roleMiddleware_1.default)('user');
const userRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, userControllers_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongoDB_1.UserRepositoryMongoDB, userModel_1.User);
    route.get('/user-data', authenticationMiddleware_1.default, userMiddleware, controller.getUserDataById);
    route.put('/update-user', authenticationMiddleware_1.default, userMiddleware, multerCloudinary_1.upload, controller.updateTheUser);
    route.put('/update-resume', authenticationMiddleware_1.default, userMiddleware, multerCloudinary_1.upload, controller.updateTheResume);
    route.delete('/delete-resume', authenticationMiddleware_1.default, userMiddleware, controller.userDeleteResume);
    route.get('/user-data/:userId', controller.getUserDataByIdParam);
    return route;
};
exports.default = userRouter;
