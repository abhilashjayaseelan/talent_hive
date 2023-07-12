"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employerController_1 = __importDefault(require("../../../adapters/controllers/employerController"));
const employerDbRepository_1 = require("../../../app/repositories/employerDbRepository");
const employerRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/employerRepositoryMongoDB");
const employerModel_1 = require("../../database/mongoDb/models/employerModel");
const multerCloudinary_1 = require("../middleware/multerCloudinary");
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const employerMiddleware = (0, roleMiddleware_1.default)('employer');
const employerRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, employerController_1.default)(employerDbRepository_1.employerDbRepository, employerRepositoryMongoDB_1.EmployerRepositoryMongoDB, employerModel_1.Employer);
    route.get('/employer-data', authenticationMiddleware_1.default, employerMiddleware, controller.getEmployerById);
    route.put('/update-employer', authenticationMiddleware_1.default, employerMiddleware, multerCloudinary_1.upload, controller.updateEmployer);
    route.get('/employer-data/:empId', controller.getEmployerByIdParam);
    return route;
};
exports.default = employerRouter;
