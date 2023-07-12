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
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobApplicationDbRepository = void 0;
const jobApplicationDbRepository = (repository) => {
    const applyForJob = (application) => __awaiter(void 0, void 0, void 0, function* () {
        const newApplication = yield repository.applyForJob(application);
        return newApplication;
    });
    const alreadyApplied = (jobId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        const existingApplication = yield repository.alreadyApplied(jobId, userId);
        return existingApplication;
    });
    const jobApplicationsForEmployer = (employerId) => __awaiter(void 0, void 0, void 0, function* () {
        const applications = yield repository.jobApplicationForEmployer(employerId);
        return applications;
    });
    const jobApplicationDetails = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        const details = yield repository.jobApplicationDetails(jobId);
        return details;
    });
    const changeApplicationStatus = (jobId, status) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedApplication = yield repository.changeApplicationStatus(jobId, status);
        return updatedApplication;
    });
    const userApplications = (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobApplications = yield repository.userApplications(userId);
        return jobApplications;
    });
    return {
        applyForJob,
        alreadyApplied,
        jobApplicationsForEmployer,
        jobApplicationDetails,
        changeApplicationStatus,
        userApplications
    };
};
exports.jobApplicationDbRepository = jobApplicationDbRepository;
