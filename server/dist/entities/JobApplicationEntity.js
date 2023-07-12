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
exports.JobApplicationEntity = void 0;
const userModel_1 = require("../frameworks/database/mongoDb/models/userModel");
const jobModel_1 = require("../frameworks/database/mongoDb/models/jobModel");
const employerModel_1 = require("../frameworks/database/mongoDb/models/employerModel");
class JobApplicationEntity {
    constructor(model) {
        this.model = model;
    }
    applyForJob(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicationExists = yield this.model.findOne({
                userId: data.userId,
                jobId: data.jobId,
            });
            if (!applicationExists) {
                const newApplication = yield this.model.create(data);
                return newApplication;
            }
            return null;
        });
    }
    isApplied(jobId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const appliedJod = yield this.model.findOne({
                jobId: jobId,
                userId: userId,
            });
            if (appliedJod) {
                return appliedJod;
            }
        });
    }
    getAllApplicationsForEmployer(employerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const applications = yield this.model
                .find({ employerId })
                .populate({ path: "userId", select: "name email image", model: userModel_1.User })
                .populate({ path: "jobId", select: "title", model: jobModel_1.Job });
            return applications;
        });
    }
    getApplicationDetails(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const details = yield this.model
                .findOne({ _id: jobId })
                .populate({
                path: "userId",
                select: "name email phone about image resume experience skills",
                model: userModel_1.User,
            })
                .populate({ path: "jobId", select: "title location", model: jobModel_1.Job })
                .populate({ path: "employerId", select: "companyName", model: employerModel_1.Employer });
            return details;
        });
    }
    changeStatusOfApplication(applicationId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedApplication = yield this.model.findOneAndUpdate({ _id: applicationId }, { $set: { applicationStatus: status } }, { new: true });
            return updatedApplication;
        });
    }
    getAllApplicationByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userApplications = yield this.model
                .find({ userId })
                .populate({
                path: "jobId",
                select: "title location",
                model: jobModel_1.Job,
            })
                .populate({
                path: "employerId",
                select: "companyName",
                model: employerModel_1.Employer,
            });
            return userApplications;
        });
    }
}
exports.JobApplicationEntity = JobApplicationEntity;
