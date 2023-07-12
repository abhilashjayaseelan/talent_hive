"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userJobApplications = exports.changeApplicationStatus = exports.getApplicationDetails = exports.allApplications = exports.existingApplication = exports.applyForJob = void 0;
const console_1 = require("console");
const applyForJob = (application, jobApplicationDbRepository) => {
    try {
        const result = jobApplicationDbRepository.applyForJob(application);
        if (result === null) {
            throw new Error(`already applied for the job. ${console_1.error}`);
        }
        return result;
    }
    catch (error) {
        throw new Error(`failed to apply for the job.  ${error.message}`);
    }
};
exports.applyForJob = applyForJob;
const existingApplication = (jobId, userId, jobApplicationDbRepository) => {
    try {
        const result = jobApplicationDbRepository.alreadyApplied(jobId, userId);
        return result;
    }
    catch (error) {
        throw new Error(`failed to get details ${error.message}`);
    }
};
exports.existingApplication = existingApplication;
const allApplications = (employerId, jobApplicationDbRepository) => {
    try {
        const applications = jobApplicationDbRepository.jobApplicationsForEmployer(employerId);
        return applications;
    }
    catch (error) {
        throw new Error(`failed to get applications ${error.message}`);
    }
};
exports.allApplications = allApplications;
const getApplicationDetails = (jobId, jobApplicationDbRepository) => {
    try {
        const details = jobApplicationDbRepository.jobApplicationDetails(jobId);
        return details;
    }
    catch (error) {
        throw new Error(`failed to get application details ${error.message}`);
    }
};
exports.getApplicationDetails = getApplicationDetails;
const changeApplicationStatus = (jobId, status, jobApplicationDbRepository) => {
    try {
        const updatedApplication = jobApplicationDbRepository.changeApplicationStatus(jobId, status);
        return updatedApplication;
    }
    catch (error) {
        throw new Error(`failed to change the application status ${error.message}`);
    }
};
exports.changeApplicationStatus = changeApplicationStatus;
const userJobApplications = (userId, jobApplicationDbRepository) => {
    try {
        const userApplications = jobApplicationDbRepository.userApplications(userId);
        return userApplications;
    }
    catch (error) {
        throw new Error(`failed to get the user applications ${error.message}`);
    }
};
exports.userJobApplications = userJobApplications;
