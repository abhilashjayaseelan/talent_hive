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
exports.jobDbRepository = void 0;
const jobDbRepository = (repository) => {
    const createJob = (job) => __awaiter(void 0, void 0, void 0, function* () {
        const newJob = yield repository.createJob(job);
        return newJob;
    });
    const updateJob = (jobId, update) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedJob = yield repository.updateJob(jobId, update);
        return updatedJob;
    });
    const deleteJob = (jobId) => __awaiter(void 0, void 0, void 0, function* () {
        yield repository.deleteJob(jobId);
    });
    const findJobByEmployer = (employerId) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield repository.findJobByEmployer(employerId);
        return jobs;
    });
    const findAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
        const allJobs = yield repository.findAllJobs();
        return allJobs;
    });
    const getJobById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const jobData = yield repository.findJobById(id);
        return jobData;
    });
    const titleLocationSalary = (title) => __awaiter(void 0, void 0, void 0, function* () {
        const distinct = yield repository.titlePlaceSalary(title);
        return distinct;
    });
    const filterJob = (role, location, salary) => __awaiter(void 0, void 0, void 0, function* () {
        const jobs = yield repository.filterJobs(role, location, salary);
        return jobs;
    });
    return {
        createJob,
        updateJob,
        deleteJob,
        findJobByEmployer,
        findAllJobs,
        getJobById,
        titleLocationSalary,
        filterJob
    };
};
exports.jobDbRepository = jobDbRepository;
