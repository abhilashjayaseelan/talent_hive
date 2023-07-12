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
exports.filterTheJobs = exports.distinctTitleLocationSalary = exports.findJobById = exports.getAllJobs = exports.findJobByEmployer = exports.deleteJob = exports.updateJob = exports.createJob = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utils/appError"));
const createJob = (job, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield jobRepository.createJob(job);
        return result;
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to create job");
    }
});
exports.createJob = createJob;
const updateJob = (job, jobId, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedJob = yield jobRepository.updateJob(jobId, job);
        return updatedJob;
    }
    catch (error) {
        throw new Error("failed to update the job");
    }
});
exports.updateJob = updateJob;
const deleteJob = (jobId, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield jobRepository.deleteJob(jobId);
    }
    catch (error) {
        throw new Error("failed to delete the job");
    }
});
exports.deleteJob = deleteJob;
const findJobByEmployer = (employerId, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobRepository.findJobByEmployer(employerId);
        return jobs;
    }
    catch (error) {
        throw new Error("failed to find the jobs");
    }
});
exports.findJobByEmployer = findJobByEmployer;
const getAllJobs = (jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allJobs = yield jobRepository.findAllJobs();
        return allJobs;
    }
    catch (error) {
        throw new Error("failed to get the jobs");
    }
});
exports.getAllJobs = getAllJobs;
const findJobById = (jobId, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobData = yield jobRepository.getJobById(jobId);
        return jobData;
    }
    catch (error) {
        throw new Error('failed to get the job data');
    }
});
exports.findJobById = findJobById;
const distinctTitleLocationSalary = (title, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const distinct = yield jobRepository.titleLocationSalary(title);
        return distinct;
    }
    catch (error) {
        throw new appError_1.default('could not find any values', httpStatus_1.HttpStatus.SERVICE_UNAVAILABLE);
    }
});
exports.distinctTitleLocationSalary = distinctTitleLocationSalary;
const filterTheJobs = (role, location, salary, jobRepository) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield jobRepository.filterJob(role, location, salary);
        return jobs;
    }
    catch (error) {
        throw new appError_1.default('could not find any results', httpStatus_1.HttpStatus.NOT_FOUND);
    }
});
exports.filterTheJobs = filterTheJobs;
