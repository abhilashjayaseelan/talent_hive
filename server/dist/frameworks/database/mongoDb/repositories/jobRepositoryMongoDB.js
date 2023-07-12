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
exports.JobRepositoryMongoDB = void 0;
const JobEntity_1 = require("../../../../entities/JobEntity");
const JobRepositoryMongoDB = (model) => {
    const jobEntity = new JobEntity_1.JobEntity(model);
    const createJob = (job) => __awaiter(void 0, void 0, void 0, function* () {
        const newJob = yield jobEntity.createJob(job);
        return newJob;
    });
    const updateJob = (jobId, updates) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedJob = yield jobEntity.updateJob(jobId, updates);
        return updatedJob;
    });
    const deleteJob = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        yield jobEntity.deleteJob(jobId);
    });
    const findJobByEmployer = (employerId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobEntity.getJobByEmployer(employerId);
        return jobs;
    });
    const findAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
        const allJobs = yield jobEntity.getAllJobs();
        return allJobs;
    });
    const findJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const jobData = yield jobEntity.getJobById(id);
        return jobData;
    });
    const titlePlaceSalary = (title) => __awaiter(void 0, void 0, void 0, function* () {
        const distinct = yield jobEntity.titleLocationSalary(title);
        return distinct;
    });
    const filterJobs = (role, location, salary) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield jobEntity.filterJob(role, location, salary);
        return jobs;
    });
    return {
        createJob,
        updateJob,
        deleteJob,
        findJobByEmployer,
        findAllJobs,
        findJobById,
        titlePlaceSalary,
        filterJobs
    };
};
exports.JobRepositoryMongoDB = JobRepositoryMongoDB;
