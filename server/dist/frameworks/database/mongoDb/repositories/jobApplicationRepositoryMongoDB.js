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
exports.JobApplicationRepositoryMongoDB = void 0;
const JobApplicationEntity_1 = require("../../../../entities/JobApplicationEntity");
const appError_1 = __importDefault(require("../../../../utils/appError"));
const httpStatus_1 = require("../../../../types/httpStatus");
const JobApplicationRepositoryMongoDB = (model) => {
    const jobApplicationEntity = new JobApplicationEntity_1.JobApplicationEntity(model);
    const applyForJob = (application) => __awaiter(void 0, void 0, void 0, function* () {
        const newApplication = yield jobApplicationEntity.applyForJob(application);
        if (newApplication === null) {
            throw new appError_1.default('already applied', httpStatus_1.HttpStatus.CONFLICT);
        }
        return newApplication;
    });
    const alreadyApplied = (jobId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const alreadyExists = yield jobApplicationEntity.isApplied(jobId, userId);
        return alreadyExists;
    });
    const jobApplicationForEmployer = (employerId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobApplications = yield jobApplicationEntity.getAllApplicationsForEmployer(employerId);
        return jobApplications;
    });
    const jobApplicationDetails = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const applicationDetails = yield jobApplicationEntity.getApplicationDetails(jobId);
        return applicationDetails;
    });
    const changeApplicationStatus = (jobId, status) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedApplication = yield jobApplicationEntity.changeStatusOfApplication(jobId, status);
        return jobApplicationDetails;
    });
    const userApplications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobApplications = yield jobApplicationEntity.getAllApplicationByUser(userId);
        return jobApplications;
    });
    return {
        applyForJob,
        alreadyApplied,
        jobApplicationForEmployer,
        jobApplicationDetails,
        changeApplicationStatus,
        userApplications
    };
};
exports.JobApplicationRepositoryMongoDB = JobApplicationRepositoryMongoDB;
