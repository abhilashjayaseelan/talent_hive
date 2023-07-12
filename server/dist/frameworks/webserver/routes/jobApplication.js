"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobApplicationDbRepository_1 = require("../../../app/repositories/jobApplicationDbRepository");
const jobApplicationRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/jobApplicationRepositoryMongoDB");
const jobApplicationModel_1 = require("../../database/mongoDb/models/jobApplicationModel");
const jobApplicationController_1 = __importDefault(require("../../../adapters/controllers/jobApplicationController"));
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const userMiddleware = (0, roleMiddleware_1.default)('user');
const employerMiddleware = (0, roleMiddleware_1.default)('employer');
const jobApplicationRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, jobApplicationController_1.default)(jobApplicationDbRepository_1.jobApplicationDbRepository, jobApplicationRepositoryMongoDB_1.JobApplicationRepositoryMongoDB, jobApplicationModel_1.JobApplication);
    route.post('/create-application', userMiddleware, controller.applyNewJob);
    route.get('/is-applied', controller.existingApplicant);
    route.get('/all-applications', employerMiddleware, controller.jobApplicationForEmployer);
    route.get('/applicant-details/:id', controller.jobApplicationDetails);
    route.patch('/change-status/:id', employerMiddleware, controller.changeTheApplicationStatus);
    route.get('/user-applications', userMiddleware, controller.userApplications);
    return route;
};
exports.default = jobApplicationRouter;
