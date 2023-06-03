"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employerAuthController_1 = __importDefault(require("../../../adapters/controllers/employerAuthController"));
const employerDbRepository_1 = require("../../../app/repositories/employerDbRepository");
const employerRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/employerRepositoryMongoDB");
const authService_1 = require("../../services/authService");
const authServiceInterface_1 = require("../../../app/services/authServiceInterface");
const employerAuthRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, employerAuthController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, employerDbRepository_1.employerDbRepository, employerRepositoryMongoDB_1.EmployerRepositoryMongoDB);
    route.post("/register", controller.employerRegister);
    route.post("/login", controller.loginEmployer);
    return route;
};
exports.default = employerAuthRouter;
