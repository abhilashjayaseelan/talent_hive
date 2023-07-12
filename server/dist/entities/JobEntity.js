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
exports.JobEntity = void 0;
class JobEntity {
    constructor(model) {
        this.model = model;
    }
    createJob(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const newJob = yield this.model.create(job);
            return newJob;
        });
    }
    updateJob(jobId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingJob = yield this.model.findById(jobId);
            if (!existingJob) {
                return null;
            }
            Object.assign(existingJob, updates);
            const updatedJob = yield existingJob.save();
            return updatedJob;
        });
    }
    deleteJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.model.findById(jobId);
            if (!job)
                throw new Error("job not found");
            yield this.model.findByIdAndDelete(jobId);
        });
    }
    getJobByEmployer(employerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.model.find({ employer: employerId });
            return jobs;
        });
    }
    getAllJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            const allJobs = yield this.model.find();
            return allJobs;
        });
    }
    getJobById(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobData = yield this.model
                .findById(Id)
                .populate("employer", "companyName email")
                .exec();
            return jobData;
        });
    }
    titleLocationSalary(field) {
        return __awaiter(this, void 0, void 0, function* () {
            const distinctValues = yield this.model.distinct(field);
            return distinctValues;
        });
    }
    filterJob(title, location, salary) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            if (title) {
                filter.title = { $regex: new RegExp(title, "i") };
            }
            if (location) {
                filter.location = { $regex: new RegExp(location, "i") };
            }
            if (salary) {
                filter.salary = salary;
            }
            const jobs = yield this.model.find(filter);
            return jobs;
        });
    }
}
exports.JobEntity = JobEntity;
