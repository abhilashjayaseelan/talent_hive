"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jobControllers_1 = __importDefault(require("../../../adapters/controllers/jobControllers"));
const jobDbRepository_1 = require("../../../app/repositories/jobDbRepository");
const jobRepositoryMongoDB_1 = require("../../database/mongoDb/repositories/jobRepositoryMongoDB");
const jobModel_1 = require("../../database/mongoDb/models/jobModel");
const roleMiddleware_1 = __importDefault(require("../middleware/roleMiddleware"));
const userMiddleware = (0, roleMiddleware_1.default)('user');
const employerMiddleware = (0, roleMiddleware_1.default)('employer');
const jobRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, jobControllers_1.default)(jobDbRepository_1.jobDbRepository, jobRepositoryMongoDB_1.JobRepositoryMongoDB, jobModel_1.Job);
    route.get('/employer-jobs', employerMiddleware, controller.getJobsByEmployer);
    route.post('/create-job', employerMiddleware, controller.createNewJob);
    route.put('/update-job/:id', employerMiddleware, controller.updateTheJob);
    route.delete('/delete-job/:id', employerMiddleware, controller.deleteTheJob);
    route.get('/all-jobs', userMiddleware, controller.findAllJobs);
    route.get('/job-data/:id', controller.jobDataById);
    route.get('/distinct/:field', userMiddleware, controller.titleLocationSalary);
    route.post('/filter-jobs', userMiddleware, controller.filterJobs);
    return route;
};
exports.default = jobRouter;
